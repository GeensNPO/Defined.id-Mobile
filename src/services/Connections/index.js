import {Account, NetworkType} from 'symbol-sdk';
import {VerifiableClaimValidator} from '@geens_npo/defined-id';
import axios from 'axios';
import {PROPERTIES} from 'constants';
import {store} from 'store';

const axiosInstance = axios.create();

class ConnectionsService {
  static validateRequestObject(request) {
    let errors = [];

    if (!request.id) {
      errors.push('Id is required');
    } else if (!VerifiableClaimValidator.isIdValid(request.id)) {
      errors.push('Id is invalid');
    }
    if (!request.requestID) {
      errors.push('No requestID specified');
    }

    if (!request.expirationDate) {
      errors.push('Expiration date is required');
    } else if (!VerifiableClaimValidator.isDateValid(request.expirationDate)) {
      errors.push('Expiration date is invalid');
    } else if (
      Date.parse(request.expirationDate) < Date.parse(new Date().toISOString())
    ) {
      errors.push('Expiration date can not be in the past');
    }

    if (!request.httpPostURL) {
      errors.push('URL for POST required');
    }

    if (!request.claimsRequested) {
      errors.push('No claims requested');
    }

    return errors;
  }

  static prepareResponse(request, verifiableClaim, key, socketClientId) {
    let response = {};
    response.socketClientId = socketClientId;
    response.requester = request.requester;
    response.id = request.id;
    response.claims = verifiableClaim;
    response.requestID = request.requestID;
    response.httpPostURL = request.httpPostURL;
    const account = Account.createFromPrivateKey(
      key.privateKey.toString('hex').toUpperCase(),
      NetworkType.TEST_NET,
    );
    response.signature = account.signData(response.requestID);
    response.issuer = account.publicKey;
    response.success = true;
    return response;
  }

  static getValueByClaimKey(key) {
    const account = store.getState().account;

    switch (key) {
      case PROPERTIES.BIRTH_DATE: {
        return account.birthDate;
      }

      case PROPERTIES.PHONE: {
        return account.phone;
      }

      case PROPERTIES.STREET_ADDRESS: {
        return `${account.firstAddressLine}, ${account.city} ${account.country}`;
      }

      case PROPERTIES.EMAIL: {
        return account.email;
      }

      case PROPERTIES.FAMILY_NAME: {
        return account.surname;
      }

      case PROPERTIES.GIVEN_NAME: {
        return account.name;
      }

      default: {
        return '';
      }
    }
  }

  static async send(url, body) {
    return axiosInstance.post(url, body);
  }
}

export default ConnectionsService;
