import {
  CREATE_CREDENTIAL,
  SAVE_CREDENTIAL,
  VERIFY_CREDENTIAL,
  VERIFY_CREDENTIAL_ERROR,
  VERIFY_CREDENTIAL_START,
} from './types';
import {
  DefinedService,
  FlashMessagesService,
  NavigationService,
} from 'services';
import {store} from 'store';
import {SCREENS} from 'navigation';

export function createCredential(request, redirectToVerify = false) {
  request.creationDate = new Date();
  return {
    type: CREATE_CREDENTIAL,
    payload: {data: request, redirectToVerify},
  };
}

export function saveCredential(request) {
  return {
    type: SAVE_CREDENTIAL,
    payload: request,
  };
}

export function verifyCredential(request) {
  return async (dispatch) => {
    try {
      dispatch({type: VERIFY_CREDENTIAL_START});
      const expirationDate = new Date(request.expirationDate);
      const verifiableClaim = DefinedService.createVerifiableClaimDocument(
        'https://www.example.com',
        expirationDate,
        request.claim,
      );
      const key = store.getState().nem.key;
      const transaction = await DefinedService.timeStampDocument(
        verifiableClaim,
        key,
      );
      const timestampDate = new Date();
      dispatch({
        type: VERIFY_CREDENTIAL,
        payload: {
          verifiableClaim,
          transaction,
          index: request.index,
          timestampDate,
          expirationDate,
        },
      });
      NavigationService.navigate(SCREENS.VERIFY_CREDENTIAL_SUCCESS);
    } catch (exception) {
      FlashMessagesService.showGenericError();
      dispatch({type: VERIFY_CREDENTIAL_ERROR});
    }
  };
}
