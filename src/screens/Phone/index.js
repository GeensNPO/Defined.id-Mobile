import React from 'react';
import * as PropTypes from 'prop-types';
import {Container} from './styles';
import {PhoneForm} from 'containers';
import {connect} from 'react-redux';
import {account as actions} from 'actions';
import {SCREENS} from 'navigation';
import {Description} from 'components';
import {Row} from 'styles';

function PhoneScreen(props) {
  const {formData, updatePhone, navigation} = props;

  const save = (request) => {
    updatePhone(request);
    navigation.navigate(SCREENS.ACCOUNT_SETTINGS);
  };

  return (
    <Container>
      <Row mb={30}>
        <Description
          center
          text="Add your phone number to build your identity once and reuse it for connections, login & proofs later."
        />
      </Row>
      <PhoneForm onSubmit={save} formData={formData} />
    </Container>
  );
}

PhoneScreen.propTypes = {
  updatePhone: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  formData: PropTypes.shape({
    phone: PropTypes.string.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  const {account} = state;
  const {phone} = account;
  const formData = {phone};
  return {formData};
}

export default connect(mapStateToProps, {
  updatePhone: actions.updatePhone,
})(PhoneScreen);
