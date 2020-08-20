import React from 'react';
import * as PropTypes from 'prop-types';
import {Container} from './styles';
import PINCode from '@haskkor/react-native-pincode';
import {FlashMessagesService} from 'services';

function SetPinCodeScreen(props) {
  const {navigation} = props;

  const onSuccess = () => {
    FlashMessagesService.showSuccess('Pin code is successfully set');
    navigation.goBack();
  };

  return (
    <Container>
      <PINCode finishProcess={onSuccess} status={'choose'} />
    </Container>
  );
}

SetPinCodeScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default SetPinCodeScreen;
