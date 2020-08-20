import React from 'react';
import * as PropTypes from 'prop-types';
import {Container} from './styles';
import PINCode from '@haskkor/react-native-pincode';
import {NAVIGATORS} from 'navigation';

function VerifyPinCodeScreen(props) {
  const {navigation} = props;

  return (
    <Container>
      <PINCode
        finishProcess={() => navigation.replace(NAVIGATORS.MAIN)}
        status={'enter'}
      />
    </Container>
  );
}

VerifyPinCodeScreen.propTypes = {
  navigation: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export default VerifyPinCodeScreen;
