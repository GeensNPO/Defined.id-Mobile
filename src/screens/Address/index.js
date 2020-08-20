import React from 'react';
import * as PropTypes from 'prop-types';
import {Container} from './styles';
import {AddressForm} from 'containers';
import {connect} from 'react-redux';
import {account as actions} from 'actions';
import {SCREENS} from 'navigation';
import {Description} from 'components';
import {Row} from 'styles';

function AddressScreen(props) {
  const {formData, updateAddress, navigation} = props;

  const save = (request) => {
    updateAddress(request);
    navigation.navigate(SCREENS.ACCOUNT_SETTINGS);
  };

  return (
    <Container>
      <Row mb={30}>
        <Description
          center
          text="Add your address to build your identity once and reuse it for connections, login & proofs later."
        />
      </Row>
      <AddressForm onSubmit={save} formData={formData} />
    </Container>
  );
}

AddressScreen.propTypes = {
  updateAddress: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  formData: PropTypes.shape({
    country: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    firstAddressLine: PropTypes.string.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  const {account} = state;
  const {country, city, firstAddressLine} = account;
  const formData = {country, city, firstAddressLine};
  return {formData};
}

export default connect(mapStateToProps, {
  updateAddress: actions.updateAddress,
})(AddressScreen);
