import {MnemonicPassPhrase} from 'symbol-hd-wallets';
import {
  Account,
  Address,
  Deadline,
  Mosaic,
  MosaicId,
  NetworkType,
  PlainMessage,
  PublicAccount,
  RepositoryFactoryHttp,
  TransactionGroup,
  TransactionType,
  TransferTransaction,
  UInt64,
} from 'symbol-sdk';
import {store} from 'store';
import {Key} from '@geens_npo/defined-id';
import {Purposes} from '@geens_npo/defined-id/lib/constants/Purposes';
import BufferService from '../Buffer';

const NODE_URL = 'http://api-01.us-east-1.096x.symboldev.network:3000';
const MOSAIC_ID = '5E62990DCAC5BE8A';
const NETWORK_GENERATION_HASH =
  '1DFB2FAA9E7F054168B0C5FCB84F4DEB62CC2B4D317D861F3168D161F54EA78B';
const DIVISIBILITY = 6;
const NETWORK_TYPE = NetworkType.TEST_NET;

class NemService {
  static generateRecoveryPhrase() {
    const dictionary = MnemonicPassPhrase.createRandom('english', 128);
    return dictionary.plain.split(' ');
  }

  static async getTotalAmount() {
    const accountAddress = store.getState().nem.address;
    const address = Address.createFromRawAddress(accountAddress);
    const repositoryFactory = new RepositoryFactoryHttp(NODE_URL);
    const accountHttp = repositoryFactory.createAccountRepository();
    return accountHttp.getAccountInfo(address).toPromise();
  }

  static async sendXym(recipientAddress, amount) {
    const data = store.getState().nem.key.privateKey.data;
    const privateKey = BufferService.bytesToHex(data);
    const recipient = Address.createFromRawAddress(recipientAddress);
    const networkCurrencyMosaicId = new MosaicId(MOSAIC_ID);

    const mosaics = [
      new Mosaic(
        networkCurrencyMosaicId,
        UInt64.fromUint(amount * Math.pow(10, DIVISIBILITY)),
      ),
    ];

    const transferTransaction = TransferTransaction.create(
      Deadline.create(),
      recipient,
      mosaics,
      PlainMessage.create('This is a test message'),
      NETWORK_TYPE,
      UInt64.fromUint(2000000),
    );

    const account = Account.createFromPrivateKey(privateKey, NETWORK_TYPE);
    const signedTransaction = account.sign(
      transferTransaction,
      NETWORK_GENERATION_HASH,
    );
    const repositoryFactory = new RepositoryFactoryHttp(NODE_URL);
    const transactionHttp = repositoryFactory.createTransactionRepository();
    return transactionHttp.announce(signedTransaction).toPromise();
  }

  static async getTransactions() {
    const accountAddress = store.getState().nem.address;
    const address = Address.createFromRawAddress(accountAddress);
    const repositoryFactory = new RepositoryFactoryHttp(NODE_URL);
    const transactionHttp = repositoryFactory.createTransactionRepository();
    const searchCriteria = {
      group: TransactionGroup.Confirmed,
      address: address,
      pageNumber: 1,
      pageSize: 100,
      type: [TransactionType.TRANSFER],
    };
    return transactionHttp.search(searchCriteria).toPromise();
  }

  static getAccountFromRecoveryPhrase(recoveryPhrase) {
    const mnemonic = new MnemonicPassPhrase(recoveryPhrase.join(' '));
    const seed = mnemonic.toSeed().toString('hex');
    const key = new Key(Purposes.find(100), seed, 1, 1);
    const account = PublicAccount.createFromPublicKey(
      key.publicKey.toString('hex').toUpperCase(),
      NETWORK_TYPE,
    );
    const address = account.address.pretty();
    return {key, address, seed};
  }
}

export default NemService;
