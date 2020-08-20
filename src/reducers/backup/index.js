import update from 'immutability-helper';
import {
  GET_ACCESS_TOKEN_ERROR,
  GET_ACCESS_TOKEN_START,
  GET_ACCESS_TOKEN,
  AUTO_BACKUP_UPDATE,
} from 'actions/backup/types';

const initialState = {
  isCompleted: false,
  isLoading: false,
  accessToken: '',
  refreshToken: '',
  autoBackup: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_ACCESS_TOKEN_START: {
      return update(state, {
        isLoading: {$set: true},
      });
    }

    case GET_ACCESS_TOKEN_ERROR: {
      return update(state, {
        isLoading: {$set: false},
      });
    }

    case AUTO_BACKUP_UPDATE: {
      return update(state, {
        autoBackup: {$set: payload.value},
      });
    }

    case GET_ACCESS_TOKEN: {
      return update(state, {
        isLoading: {$set: false},
        isCompleted: {$set: true},
        accessToken: {$set: payload.accessToken},
        refreshToken: {$set: payload.refreshToken},
      });
    }

    default:
      return state;
  }
};
