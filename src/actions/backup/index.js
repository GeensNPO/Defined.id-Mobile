import {
  AUTO_BACKUP_UPDATE,
  GET_ACCESS_TOKEN,
  GET_ACCESS_TOKEN_ERROR,
  GET_ACCESS_TOKEN_START,
} from './types';
import {FlashMessagesService, GeensService} from 'services';

export function updateAutoBackup(value) {
  return {
    type: AUTO_BACKUP_UPDATE,
    payload: {value},
  };
}

export function getAccessToken(code, callback) {
  return async (dispatch) => {
    try {
      dispatch({type: GET_ACCESS_TOKEN_START});
      const {data} = await GeensService.getAccessToken(code);
      const {access_token, refresh_token} = data;
      const payload = {accessToken: access_token, refreshToken: refresh_token};
      dispatch({type: GET_ACCESS_TOKEN, payload});
      callback();
    } catch (error) {
      FlashMessagesService.showGenericError();
      dispatch({type: GET_ACCESS_TOKEN_ERROR});
    }
  };
}
