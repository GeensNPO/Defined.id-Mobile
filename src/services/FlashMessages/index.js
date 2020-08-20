import {showMessage} from 'react-native-flash-message';

class FlashMessagesService {
  static showGenericError(description = null) {
    showMessage({
      message: 'An error has occurred',
      description,
      type: 'danger',
    });
  }

  static showError(message, description = null) {
    showMessage({
      message: message,
      description,
      type: 'danger',
    });
  }

  static showSuccess(message, description = null) {
    showMessage({
      message: message,
      description,
      type: 'success',
    });
  }
}

export default FlashMessagesService;
