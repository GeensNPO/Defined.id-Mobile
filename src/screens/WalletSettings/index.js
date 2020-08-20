import React from 'react';
import * as PropTypes from 'prop-types';
import {Container} from './styles';
import {Description} from 'components';
import {Row} from 'styles';
import {WalletSettingsForm} from 'containers';
import {connect} from 'react-redux';
import {nem as actions} from 'actions';
import {SCREENS} from 'navigation';

function WalletSettingsScreen(props) {
  const {navigation, formData, updateWalletSettings} = props;

  const save = (data) => {
    updateWalletSettings(data);
    navigation.navigate(SCREENS.WALLET);
  };

  return (
    <Container>
      <Row center mb={30}>
        <Description
          center
          text="All transactions and overall activity are tied to your Defined.id account."
        />
      </Row>
      <WalletSettingsForm onSubmit={save} formData={formData} />
    </Container>
  );
}

WalletSettingsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  updateWalletSettings: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    secretKey: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  const {nem} = state;
  const {address, secretKey} = nem;
  return {formData: {address, secretKey}};
}

export default connect(mapStateToProps, {
  updateWalletSettings: actions.updateWalletSettings,
})(WalletSettingsScreen);
