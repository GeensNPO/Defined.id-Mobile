import {
  Did,
  Key,
  NemAccount,
  NemTransactionService,
  Purposes,
  SecurityService,
} from '@geens_npo/defined-id';
import {store} from 'store';

const DEFINED_ID__METHOD = 'defined';
const DEFINED_ID_ISSUER = 'Defined.id';
const DEFINED_ID_CATAPULT_BLOCK_CHAIN = 'PublicTestnet';
const NODE_URL = 'http://api-01.us-east-1.096x.symboldev.network:3000';
const DEFINED_ID_TYPE = ['VerifiableCredential'];
const SYMBOL_EXPLORER__URL = 'http://explorer-96x.symboldev.network';

class DefinedService {
  static createDID(key) {
    const nemPublicKey = key.publicKey.toString('hex').toUpperCase();
    return new Did(DEFINED_ID__METHOD, nemPublicKey);
  }

  static createVerifiableClaimDocument(context, expirationDate, claim) {
    const did = store.getState().nem.did;

    return {
      type: DEFINED_ID_TYPE,
      id: new Did(did.method, did.nemPublicKey, did.salt),
      issuer: DEFINED_ID_ISSUER,
      issuanceDate: new Date().toISOString().slice(0, 10),
      expirationDate: expirationDate.toISOString().slice(0, 10),
      context: context,
      claim: claim,
    };
  }

  static hashDocument(document) {
    return SecurityService.sha256StringHash(JSON.stringify(document));
  }

  static async timeStampDocument(document, key) {
    const documentHash = this.hashDocument(document);
    const seed = store.getState().nem.seed;
    const newKey = new Key(Purposes.find(100), seed, 1, 1);
    const nemAccount = new NemAccount(newKey, DEFINED_ID_CATAPULT_BLOCK_CHAIN);

    return NemTransactionService.timestampTransaction(
      nemAccount,
      documentHash,
      NODE_URL,
    );
  }

  static createExplorerURL(transactionHash) {
    return SYMBOL_EXPLORER__URL + '/transaction/' + transactionHash;
  }

  static async verifyTimeStamp(documentHash, nemPublicKey) {
    return NemTransactionService.getTransactionIndexForHash(
      nemPublicKey,
      documentHash,
      NODE_URL,
      DEFINED_ID_CATAPULT_BLOCK_CHAIN,
    )
      .then((result) => {
        let info;
        switch (result) {
          case -1:
            info = 'Hash was not registered';
            return info;
          case 0:
            info = 'Hash was registered';
            return info;
          default:
            info = 'Hash was registered but is outdated';
            return info;
        }
      })
      .catch((error) => {
        return error;
      });
  }
}
export default DefinedService;
