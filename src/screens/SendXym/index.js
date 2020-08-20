import React from 'react';
import * as PropTypes from 'prop-types';
import {Container} from './styles';
import {SendXymForm} from 'containers';
import {SCREENS} from 'navigation';
import {connect} from 'react-redux';
import {nem as actions} from 'actions';

function SendXymScreen(props) {
  const {navigation, sendXym} = props;

  const save = (request) => {
    sendXym(request);
    navigation.navigate(SCREENS.WALLET);
  };

  return (
    <Container>
      <SendXymForm onSubmit={save} />
    </Container>
  );
}

SendXymScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  sendXym: PropTypes.func.isRequired,
};

export default connect(null, {
  sendXym: actions.sendXym,
})(SendXymScreen);
