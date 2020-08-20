import React from 'react';
import * as PropTypes from 'prop-types';
import {Container, Section} from './styles';
import {RecoveryPhrase} from 'containers';
import {BUTTONS, Row} from 'styles';
import {Button, Description, SectionTitle} from 'components';
import {SCREENS} from 'navigation';

function RecoveryPhraseScreen(props) {
  const {navigation} = props;

  return (
    <Container>
      <Section>
        <Row center mb={15}>
          <SectionTitle text="Recovery Phrase" />
        </Row>
        <Row mb={25}>
          <RecoveryPhrase />
        </Row>
      </Section>
      <Section>
        <Row center mb={25}>
          <Description
            center
            text="This is your personal Recovery Phrase. To protect your wallet keep it safe and private."
          />
        </Row>
        <Row center mb={0}>
          <Button
            title="Confirm seed"
            type={BUTTONS.SECONDARY}
            onPress={() => navigation.navigate(SCREENS.CONFIRM_SEED)}
          />
        </Row>
      </Section>
    </Container>
  );
}

RecoveryPhraseScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default RecoveryPhraseScreen;
