import update from 'immutability-helper';
import {SET_PIN_CODE, WALKTHROUGH_COMPLETE} from 'actions/app/types';

const initialState = {
  isWalkthroughComplete: false,
  pinCode: '',
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case WALKTHROUGH_COMPLETE: {
      return update(state, {
        isWalkthroughComplete: {$set: true},
      });
    }

    case SET_PIN_CODE: {
      return update(state, {
        pinCode: {$set: payload.pinCode},
      });
    }

    default:
      return state;
  }
};
