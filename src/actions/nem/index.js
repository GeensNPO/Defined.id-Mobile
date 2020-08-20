import {
  CONFIRM_RECOVERY_PHRASE,
  CONFIRM_RECOVERY_PHRASE_ERROR,
  CONFIRM_RECOVERY_PHRASE_START,
  GET_RECOVERY_PHRASE,
  GET_RECOVERY_PHRASE_ERROR,
  GET_RECOVERY_PHRASE_START,
  GET_TOTAL_AMOUNT,
  GET_TOTAL_AMOUNT_ERROR,
  GET_TOTAL_AMOUNT_START,
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_ERROR,
  GET_TRANSACTIONS_START,
  RECOVER_WALLET,
  RECOVER_WALLET_ERROR,
  RECOVER_WALLET_START,
  SEND_XYM,
  SEND_XYM_ERROR,
  SEND_XYM_START,
  UPDATE_WALLET_SETTINGS,
} from './types';
import {DefinedService, FlashMessagesService, NemService} from 'services';

export function getTransactions() {
  return async (dispatch) => {
    try {
      dispatch({type: GET_TRANSACTIONS_START});
      const {data} = await NemService.getTransactions();
      dispatch({type: GET_TRANSACTIONS, payload: {transactions: data}});
    } catch (exception) {
      FlashMessagesService.showGenericError();
      dispatch({type: GET_TRANSACTIONS_ERROR});
    }
  };
}

export function getTotalAmount() {
  return async (dispatch) => {
    try {
      dispatch({type: GET_TOTAL_AMOUNT_START});
      const accountInfo = await NemService.getTotalAmount();
      const totalAmount =
        accountInfo.mosaics[0].amount.compact() / Math.pow(10, 6);
      dispatch({type: GET_TOTAL_AMOUNT, payload: {totalAmount}});
    } catch (exception) {
      if (exception.indexOf('"code":"ResourceNotFound"') === -1) {
        FlashMessagesService.showGenericError();
      }
      dispatch({type: GET_TOTAL_AMOUNT_ERROR});
    }
  };
}

export function sendXym(request) {
  return async (dispatch) => {
    try {
      dispatch({type: SEND_XYM_START});
      await NemService.sendXym(request.address, request.amount);
      dispatch({type: SEND_XYM});
    } catch (exception) {
      FlashMessagesService.showGenericError();
      dispatch({type: SEND_XYM_ERROR});
    }
  };
}

export function updateWalletSettings(request) {
  return {
    type: UPDATE_WALLET_SETTINGS,
    payload: request,
  };
}

export function getRecoveryPhrase() {
  return async (dispatch) => {
    try {
      dispatch({type: GET_RECOVERY_PHRASE_START});
      const recoveryPhrase = NemService.generateRecoveryPhrase();
      dispatch({type: GET_RECOVERY_PHRASE, payload: {recoveryPhrase}});
    } catch (exception) {
      FlashMessagesService.showGenericError();
      dispatch({type: GET_RECOVERY_PHRASE_ERROR});
    }
  };
}

export function confirmRecoveryPhrase(recoveryPhrase) {
  return async (dispatch) => {
    try {
      dispatch({type: CONFIRM_RECOVERY_PHRASE_START});
      const response = NemService.getAccountFromRecoveryPhrase(recoveryPhrase);
      const did = DefinedService.createDID(response.key);
      dispatch({type: CONFIRM_RECOVERY_PHRASE, payload: {...response, did}});
    } catch (exception) {
      FlashMessagesService.showGenericError();
      dispatch({type: CONFIRM_RECOVERY_PHRASE_ERROR});
    }
  };
}

export function recoverWallet(recoveryPhrase) {
  return async (dispatch) => {
    try {
      dispatch({type: RECOVER_WALLET_START});
      const response = NemService.getAccountFromRecoveryPhrase(recoveryPhrase);
      const did = DefinedService.createDID(response.key);
      dispatch({type: RECOVER_WALLET, payload: {...response, did}});
    } catch (exception) {
      FlashMessagesService.showGenericError();
      dispatch({type: RECOVER_WALLET_ERROR});
    }
  };
}
