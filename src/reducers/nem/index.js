import update from 'immutability-helper';
import {
  GET_RECOVERY_PHRASE,
  GET_RECOVERY_PHRASE_ERROR,
  GET_RECOVERY_PHRASE_START,
  GET_TOTAL_AMOUNT,
  GET_TOTAL_AMOUNT_ERROR,
  GET_TOTAL_AMOUNT_START,
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_ERROR,
  GET_TRANSACTIONS_START,
  SEND_XYM,
  SEND_XYM_ERROR,
  SEND_XYM_START,
  UPDATE_WALLET_SETTINGS,
  CONFIRM_RECOVERY_PHRASE,
  RECOVER_WALLET,
  CONFIRM_RECOVERY_PHRASE_START,
  CONFIRM_RECOVERY_PHRASE_ERROR,
  RECOVER_WALLET_START, RECOVER_WALLET_ERROR,
} from 'actions/nem/types';

const initialState = {
  transactions: [],
  totalAmount: 0,
  isLoading: false,
  secretKey: '',
  recoveryPhrase: [],
  isRecoveryPhraseConfirmed: false,
  seed: '',
  key: null,
  address: '',
  did: '',
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SEND_XYM_START:
    case CONFIRM_RECOVERY_PHRASE_START:
    case RECOVER_WALLET_START:
    case GET_RECOVERY_PHRASE_START:
    case GET_TOTAL_AMOUNT_START:
    case GET_TRANSACTIONS_START: {
      return update(state, {
        isLoading: {$set: true},
      });
    }

    case SEND_XYM_ERROR: {
      return update(state, {
        isLoading: {$set: false},
        transactions: {$set: []},
      });
    }

    case RECOVER_WALLET_ERROR:
    case CONFIRM_RECOVERY_PHRASE_ERROR: {
      return update(state, {
        isLoading: {$set: false},
      });
    }

    case GET_RECOVERY_PHRASE: {
      return update(state, {
        recoveryPhrase: {$set: payload.recoveryPhrase},
        isLoading: {$set: false},
      });
    }

    case GET_RECOVERY_PHRASE_ERROR: {
      return update(state, {
        isLoading: {$set: false},
        recoveryPhrase: {$set: []},
      });
    }

    case GET_TRANSACTIONS_ERROR: {
      return update(state, {
        isLoading: {$set: false},
      });
    }

    case GET_TOTAL_AMOUNT_ERROR: {
      return update(state, {
        totalAmount: {$set: 0},
        isLoading: {$set: false},
      });
    }

    case GET_TRANSACTIONS: {
      return update(state, {
        transactions: {$set: payload.transactions},
        isLoading: {$set: false},
      });
    }

    case GET_TOTAL_AMOUNT: {
      return update(state, {
        totalAmount: {$set: payload.totalAmount},
        isLoading: {$set: false},
      });
    }

    case UPDATE_WALLET_SETTINGS: {
      return update(state, {
        secretKey: {$set: payload.secretKey},
      });
    }

    case SEND_XYM: {
      return update(state, {
        isLoading: {$set: false},
      });
    }

    case RECOVER_WALLET:
    case CONFIRM_RECOVERY_PHRASE: {
      return update(state, {
        isRecoveryPhraseConfirmed: {$set: true},
        recoveryPhrase: {$set: []},
        seed: {$set: payload.seed},
        did: {$set: payload.did},
        key: {$set: payload.key},
        isLoading: {$set: false},
        address: {$set: payload.address},
      });
    }

    default:
      return state;
  }
};
