import React from 'react';
import * as PropTypes from 'prop-types';
import {Container} from './styles';
import {EmailForm} from 'containers';
import {connect} from 'react-redux';
import {account as actions} from 'actions';
import {SCREENS} from 'navigation';
import {Row} from 'styles';
import {Description} from 'components';

function EmailScreen(props) {
  const {formData, updateEmail, navigation} = props;

  const save = (request) => {
    updateEmail(request);
    navigation.navigate(SCREENS.ACCOUNT_SETTINGS);
  };

  return (
    <Container>
      <Row mb={30}>
        <Description
          center
          text="Add your email to build your identity once and reuse it for connections, login & proofs later."
        />
      </Row>
      <EmailForm onSubmit={save} formData={formData} />
    </Container>
  );
}

EmailScreen.propTypes = {
  updateEmail: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  formData: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  const {account} = state;
  const {email} = account;
  const formData = {email};
  return {formData};
}

export default connect(mapStateToProps, {
  updateEmail: actions.updateEmail,
})(EmailScreen);
