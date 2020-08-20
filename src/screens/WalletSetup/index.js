import React from 'react';
import * as PropTypes from 'prop-types';
import {Container} from './styles';
import {Button, Description} from 'components';
import {BUTTONS, Row} from 'styles';
import {SCREENS} from 'navigation';

function WalletSetupScreen(props) {
  const {navigation} = props;

  return (
    <Container>
      <Row mb={50}>
        <Description
          center
          text="Add Symbol Wallet to your account to send, receive and monitor XYM for blockchain transactions"
        />
      </Row>
      <Row mb={50} center>
        <Button
          title="Create new wallet"
          onPress={() => navigation.navigate(SCREENS.RECOVERY_PHRASE)}
        />
      </Row>
      <Row mb={0} center>
        <Button
          type={BUTTONS.SECONDARY}
          title="Recover with seed phrase"
          onPress={() => navigation.navigate(SCREENS.WALLET_RECOVERY)}
        />
      </Row>
    </Container>
  );
}

WalletSetupScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default WalletSetupScreen;
