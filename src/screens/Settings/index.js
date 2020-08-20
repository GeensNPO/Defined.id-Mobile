import React from 'react';
import * as PropTypes from 'prop-types';
import {ScrollableWrapper, SettingsButton, SectionTitle} from 'components';
import {IMAGES} from 'constants';
import {SCREENS} from 'navigation';
import {Row} from 'styles';
import {connect} from 'react-redux';

function SettingsScreen(props) {
  const {navigation, isBackupCompleted, isRecoveryPhraseConfirmed} = props;

  const renderNemButton = () => {
    return (
      <SettingsButton
        onPress={() =>
          navigation.navigate(
            isRecoveryPhraseConfirmed ? SCREENS.WALLET : SCREENS.WALLET_SETUP,
          )
        }
        description={
          isRecoveryPhraseConfirmed
            ? 'Last update 20 OCT 2020 I 14:15'
            : 'Set up Symbol Wallet'
        }
        image={IMAGES.NEM_ICON}
        danger={!isRecoveryPhraseConfirmed}
        title="Wallet"
      />
    );
  };

  return (
    <ScrollableWrapper>
      <Row center mb={30}>
        <SectionTitle text="Account" />
      </Row>
      <Row mb={15}>
        <SettingsButton
          onPress={() => navigation.navigate(SCREENS.ACCOUNT_SETTINGS)}
          description="Setup account details"
          image={IMAGES.CIRCLE_PENDING}
          title="Account"
        />
      </Row>
      <Row mb={15}>{renderNemButton()}</Row>
      <Row mb={30}>
        <SettingsButton
          onPress={() => navigation.navigate(SCREENS.BACKUP_SETTINGS)}
          description={
            isBackupCompleted ? 'Backed up successfully' : 'Account At Risk'
          }
          image={IMAGES.GEENS_ICON}
          danger={!isBackupCompleted}
          success={isBackupCompleted}
          title="Backup & Recovery"
        />
      </Row>
      <Row center mb={30}>
        <SectionTitle text="Device" />
      </Row>
      <Row mb={10}>
        <SettingsButton
          description="Language, Notifications, Updates etc."
          image={IMAGES.SETTINGS_ICON}
          title="App Settings"
          onPress={() => navigation.navigate(SCREENS.APP_SETTINGS)}
        />
      </Row>
    </ScrollableWrapper>
  );
}

SettingsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  isBackupCompleted: PropTypes.bool.isRequired,
  isRecoveryPhraseConfirmed: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const {backup, nem} = state;
  const {isCompleted} = backup;
  const {isRecoveryPhraseConfirmed} = nem;
  return {isBackupCompleted: isCompleted, isRecoveryPhraseConfirmed};
}

export default connect(mapStateToProps)(SettingsScreen);
