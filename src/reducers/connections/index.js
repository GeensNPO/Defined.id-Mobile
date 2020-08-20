import update from 'immutability-helper';
import {
  ADD_CONNECTION,
  ADD_CONNECTION_ERROR,
  ADD_CONNECTION_START,
  DECLINE_CONNECTION,
  DECLINE_CONNECTION_ERROR,
  DECLINE_CONNECTION_START,
  VERIFY_CONNECTION,
  VERIFY_CONNECTION_ERROR,
  VERIFY_CONNECTION_START,
} from 'actions/connections/types';
import {CONNECTION_STATUSES} from 'constants';

const initialState = {
  connections: [],
  isLoading: false,
  addedConnectionIndex: null,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case ADD_CONNECTION: {
      const connections = state.connections;
      const addedConnectionIndex = connections.push(payload.connection);
      return update(state, {
        connections: {$set: connections},
        addedConnectionIndex: {$set: addedConnectionIndex - 1},
      });
    }

    case VERIFY_CONNECTION: {
      const connections = state.connections;
      connections[payload.index].status = CONNECTION_STATUSES.VERIFIED;
      connections[payload.index].statusUpdateDate = payload.statusUpdateDate;

      return update(state, {
        isLoading: {$set: false},
        connections: {$set: connections},
      });
    }

    case DECLINE_CONNECTION: {
      const connections = state.connections;
      connections[payload.index].status = CONNECTION_STATUSES.UNVERIFIED;
      connections[payload.index].statusUpdateDate = payload.statusUpdateDate;

      return update(state, {
        isLoading: {$set: false},
        connections: {$set: connections},
      });
    }

    case DECLINE_CONNECTION_ERROR:
    case VERIFY_CONNECTION_ERROR:
    case ADD_CONNECTION_ERROR: {
      return update(state, {
        isLoading: {$set: false},
      });
    }

    case DECLINE_CONNECTION_START:
    case VERIFY_CONNECTION_START:
    case ADD_CONNECTION_START: {
      return update(state, {
        isLoading: {$set: true},
      });
    }

    default:
      return state;
  }
};
