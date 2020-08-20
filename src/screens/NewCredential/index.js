import React from 'react';
import * as PropTypes from 'prop-types';
import {Container} from './styles';
import {NewCredentialForm} from 'containers';
import {connect} from 'react-redux';
import {credentials as actions} from 'actions';
import {SCREENS} from 'navigation';

function NewCredentialScreen(props) {
  const {navigation, saveCredential} = props;

  const submit = (formData) => {
    saveCredential(formData);
    navigation.navigate(SCREENS.CREDENTIAL_REVIEW);
  };

  return (
    <Container>
      <NewCredentialForm onSubmit={submit} />
    </Container>
  );
}

NewCredentialScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  saveCredential: PropTypes.func.isRequired,
};

export default connect(null, {
  saveCredential: actions.saveCredential,
})(NewCredentialScreen);
