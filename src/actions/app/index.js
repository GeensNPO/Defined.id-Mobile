import {SET_PIN_CODE, WALKTHROUGH_COMPLETE} from './types';

export function completeWalkthrough() {
  return {
    type: WALKTHROUGH_COMPLETE,
  };
}

export function setPinCode(request) {
  return {
    type: SET_PIN_CODE,
    payload: request,
  };
}
