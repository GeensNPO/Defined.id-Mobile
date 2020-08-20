import Connection from './index.js';
import DefinedID from '../DefinedID/index.js';
import geens from '@geens_npo/defined-id';

const requestFromQRCode = {
  requester: 'publicKey',
  id: 'http://defined.id/vc/1', // login
  expirationDate: '2020-10-10',
  requestID: '123-xyz',
  httpPostURL: 'http:localhost:3000',
  claimsRequested: ['firstName', 'lastName'],
};

const errors = Connection.validateRequestObject(requestFromQRCode);
if (errors && !errors.length) {
  // FRONT END logic match making for claims
  const keyId = 100;
  const seed = 'test';
  const personaId = 1;
  const connectionId = 1;

  const key = new geens.Key(
    // @ts-ignore
    geens.Purposes.find(keyId),
    seed,
    personaId,
    connectionId,
  );
  const did = DefinedID.createDID(key);
  const claim = {
    id: 'http://defined.id/vc/1',
    firstName: 'Istvan',
    lastName: 'Deak',
  };

  const context = [
    'https://schema.org/givenName',
    'https://schema.org/familyName',
  ];
  const expirationDate = requestFromQRCode.expirationDate;
  const verifiableClaim = DefinedID.createVerifiableClaimDocument(
    did,
    expirationDate,
    context,
    claim,
  );

  // create response
  const response = Connection.prepareResponse(
    requestFromQRCode,
    verifiableClaim,
    key,
  );
  console.log('response is');
  console.log(response);
  //Connection.send(response)

  // for testing
  // receiver validates
  if (Connection.validResponse(response)) {
    console.log('valid response, connection established');
  }
} else {
  throw 'invalid request object';
}
