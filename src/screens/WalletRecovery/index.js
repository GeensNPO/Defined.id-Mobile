import React, {useEffect, useState} from 'react';
import * as PropTypes from 'prop-types';
import {Container, Section} from './styles';
import {BUTTONS, Row} from 'styles';
import {
  Button,
  Description,
  RecoveryPhraseInput,
  SectionTitle,
} from 'components';
import {SCREENS} from 'navigation';
import {connect} from 'react-redux';
import {nem as actions} from 'actions';

function WalletRecoveryScreen(props) {
  const {navigation, recoverWallet, isRecoveryPhraseConfirmed} = props;

  const [disabled, setDisabled] = useState(true);
  const [recoveryPhrase, setRecoveryPhrase] = useState([]);

  useEffect(() => {
    if (isRecoveryPhraseConfirmed) {
      navigation.replace(SCREENS.WALLET_RECOVERY_SUCCESS);
    }
  });

  const confirm = () => {
    recoverWallet(recoveryPhrase);
  };

  const onChange = (value) => {
    setRecoveryPhrase(value);
    setDisabled(value.includes(''));
  };

  return (
    <Container>
      <Section>
        <Row center mb={15}>
          <SectionTitle text="Re-enter seed phrase in order." />
        </Row>
        <Row mb={25}>
          <RecoveryPhraseInput onChange={onChange} />
        </Row>
      </Section>
      <Section>
        <Row center mb={25}>
          <Description
            center
            text="Type in the words in order from your seed phrase recovery paper"
          />
        </Row>
        <Row center mb={0}>
          <Button
            title="Confirm"
            disabled={disabled}
            type={BUTTONS.SECONDARY}
            onPress={confirm}
          />
        </Row>
      </Section>
    </Container>
  );
}

WalletRecoveryScreen.propTypes = {
  recoverWallet: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  isRecoveryPhraseConfirmed: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const {nem} = state;
  const {isRecoveryPhraseConfirmed} = nem;
  return {isRecoveryPhraseConfirmed};
}

export default connect(mapStateToProps, {
  recoverWallet: actions.recoverWallet,
})(WalletRecoveryScreen);
