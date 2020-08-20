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
} from './types';
import {
  ConnectionsService,
  DefinedService,
  FlashMessagesService,
} from 'services';
import {store} from 'store';
import {Key, Purposes} from '@geens_npo/defined-id';
import {CONNECTION_STATUSES} from 'constants';

export function declineConnection(request, callback) {
  return async (dispatch) => {
    try {
      dispatch({type: DECLINE_CONNECTION_START});
      const {index} = request;
      const connections = store.getState().connections.connections;
      const connection = connections[index];
      const {data} = connection;
      const {socketClientId} = data;

      await ConnectionsService.send(data.httpPostURL, {
        success: false,
        socketClientId,
      });
      const statusUpdateDate = new Date().toISOString();
      dispatch({type: DECLINE_CONNECTION, payload: {index, statusUpdateDate}});

      if (callback) {
        callback();
      }
    } catch (exception) {
      FlashMessagesService.showGenericError();
      dispatch({type: DECLINE_CONNECTION_ERROR});
    }
  };
}

export function verifyConnection(request, callback) {
  return async (dispatch) => {
    try {
      dispatch({type: VERIFY_CONNECTION_START});
      const {index} = request;
      const connections = store.getState().connections.connections;
      const connection = connections[index];
      const {data} = connection;
      const {context, claimsRequested, expirationDate, socketClientId} = data;

      const claim = {
        id: data.id,
      };

      for (let requestedClaim of claimsRequested) {
        claim[requestedClaim.key] = ConnectionsService.getValueByClaimKey(
          requestedClaim.key,
        );
      }

      const verifiableCredential = DefinedService.createVerifiableClaimDocument(
        context,
        new Date(expirationDate),
        claim,
      );

      const seed = store.getState().nem.seed;
      const newKey = new Key(Purposes.find(100), seed, 1, 1);
      const preparedRequest = ConnectionsService.prepareResponse(
        data,
        verifiableCredential,
        newKey,
        socketClientId,
      );

      await ConnectionsService.send(data.httpPostURL, preparedRequest);
      const statusUpdateDate = new Date().toISOString();
      dispatch({type: VERIFY_CONNECTION, payload: {index, statusUpdateDate}});
      callback();
    } catch (exception) {
      FlashMessagesService.showGenericError();
      dispatch({type: VERIFY_CONNECTION_ERROR});
    }
  };
}

export function addConnection(request, callback) {
  return async (dispatch) => {
    try {
      dispatch({type: ADD_CONNECTION_START});
      const {data} = request;

      const errors = ConnectionsService.validateRequestObject(data);
      if (errors.length > 0) {
        FlashMessagesService.showError(errors[0]);
        dispatch({type: ADD_CONNECTION_ERROR});
        return;
      }

      dispatch({
        type: ADD_CONNECTION,
        payload: {
          connection: {
            status: CONNECTION_STATUSES.PENDING,
            date: new Date().toISOString(),
            data,
          },
        },
      });
      callback();
    } catch (exception) {
      FlashMessagesService.showGenericError();
      dispatch({type: ADD_CONNECTION_ERROR});
    }
  };
}
