import React from 'react';
import * as PropTypes from 'prop-types';
import {Container, Header, Icon, IconLink} from './styles';
import {TransactionsLog} from 'containers';
import {IMAGES} from 'constants';
import {SCREENS} from 'navigation';

function WalletScreen(props) {
  const {navigation} = props;

  return (
    <Container>
      <Header>
        <IconLink onPress={() => navigation.navigate(SCREENS.SEND_XYM)}>
          <Icon source={IMAGES.CONNECTIONS_ACTIVE} />
        </IconLink>
        <IconLink onPress={() => navigation.navigate(SCREENS.WALLET_SETTINGS)}>
          <Icon source={IMAGES.SETTINGS_ACTIVE} />
        </IconLink>
      </Header>
      <TransactionsLog />
    </Container>
  );
}

WalletScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default WalletScreen;
