import update from 'immutability-helper';
import {
  CREATE_CREDENTIAL,
  SAVE_CREDENTIAL,
  VERIFY_CREDENTIAL,
  VERIFY_CREDENTIAL_ERROR,
  VERIFY_CREDENTIAL_START,
} from 'actions/credentials/types';
import {CLAIM_STATUSES} from 'constants';
import {NavigationService} from 'services';
import {SCREENS} from 'navigation';

const initialState = {
  claims: [],
  unverifiedCredentials: [],
  customCredential: null,
  isLoading: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case CREATE_CREDENTIAL: {
      const unverifiedCredentials = state.unverifiedCredentials;
      const index = unverifiedCredentials.push(payload.data);
      if (payload.redirectToVerify) {
        NavigationService.navigate(SCREENS.VERIFY_CREDENTIAL, {id: index - 1});
      }
      return update(state, {
        unverifiedCredentials: {$set: unverifiedCredentials},
      });
    }

    case SAVE_CREDENTIAL: {
      return update(state, {
        customCredential: {$set: payload},
      });
    }

    case VERIFY_CREDENTIAL_START: {
      return update(state, {
        isLoading: {$set: true},
      });
    }

    case VERIFY_CREDENTIAL_ERROR: {
      return update(state, {
        isLoading: {$set: false},
      });
    }

    case VERIFY_CREDENTIAL: {
      const unverifiedCredentials = state.unverifiedCredentials;
      unverifiedCredentials[payload.index].status = CLAIM_STATUSES.VERIFIED;
      unverifiedCredentials[payload.index].expirationDate =
        payload.expirationDate;
      unverifiedCredentials[payload.index].timestampDate =
        payload.timestampDate;
      unverifiedCredentials[payload.index].verifiableClaim =
        payload.verifiableClaim;
      unverifiedCredentials[payload.index].transaction = payload.transaction;

      return update(state, {
        isLoading: {$set: false},
        unverifiedCredentials: {$set: unverifiedCredentials},
      });
    }

    default:
      return state;
  }
};
