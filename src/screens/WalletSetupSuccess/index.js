import React from 'react';
import * as PropTypes from 'prop-types';
import {Container, StyledIllustration} from './styles';
import {Button, Title} from 'components';
import {IMAGES} from 'constants';
import {Row} from 'styles';

function WalletSetupSuccessScreen(props) {
  const {navigation} = props;

  return (
    <Container>
      <Row mb={20}>
        <Title text="Success!" />
      </Row>
      <StyledIllustration
        image={IMAGES.CONNECTIONS_ILLUSTRATION}
        description="You can start using the Symbol Wallet, send, receive and monitor XYM transactions."
        title="Symbol Wallet recovery was successful."
      />
      <Row center mb={0}>
        <Button title="OK" onPress={navigation.popToTop} />
      </Row>
    </Container>
  );
}

WalletSetupSuccessScreen.propTypes = {
  navigation: PropTypes.shape({
    popToTop: PropTypes.func.isRequired,
  }).isRequired,
};

export default WalletSetupSuccessScreen;
