import React, {useState} from 'react';
import * as PropTypes from 'prop-types';
import {Container, SectionTitle, Section} from './styles';
import {ConfirmSeed} from 'containers';
import {BUTTONS, Row} from 'styles';
import {Button} from 'components';
import {SCREENS} from 'navigation';
import {connect} from 'react-redux';
import {nem as actions} from 'actions';

function ConfirmSeedScreen(props) {
  const {navigation, confirmRecoveryPhrase, recoveryPhrase, isLoading} = props;

  const [disabled, setDisabled] = useState(true);

  const confirm = () => {
    confirmRecoveryPhrase(recoveryPhrase);
    navigation.replace(SCREENS.WALLET_SETUP_SUCCESS);
  };

  return (
    <Container>
      <Section>
        <SectionTitle>Re-enter seed phrase in order.</SectionTitle>
        <Row mb={25}>
          <ConfirmSeed onChange={(valid) => setDisabled(!valid)} />
        </Row>
      </Section>
      <Section>
        <Row center mb={0}>
          <Button
            loading={isLoading}
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

ConfirmSeedScreen.propTypes = {
  confirmRecoveryPhrase: PropTypes.func.isRequired,
  recoveryPhrase: PropTypes.arrayOf(PropTypes.string).isRequired,
  navigation: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  const {nem} = state;
  const {recoveryPhrase, isLoading} = nem;
  return {recoveryPhrase, isLoading};
}

export default connect(mapStateToProps, {
  confirmRecoveryPhrase: actions.confirmRecoveryPhrase,
})(ConfirmSeedScreen);
