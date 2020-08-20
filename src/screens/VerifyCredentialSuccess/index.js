import React from 'react';
import * as PropTypes from 'prop-types';
import {Container, StyledIllustration} from './styles';
import {Button, Title} from 'components';
import {IMAGES} from 'constants';
import {Row} from 'styles';
import {NAVIGATORS} from 'navigation';

function VerifyCredentialSuccessScreen(props) {
  const {navigation} = props;

  const navigate = () => {
    navigation.reset({
      routes: [{name: NAVIGATORS.MAIN}],
    });
  };

  return (
    <Container>
      <Row mb={20}>
        <Title text="Success!" />
      </Row>
      <StyledIllustration
        image={IMAGES.CONNECTIONS_ILLUSTRATION}
        description="To check the status or to update your Credentials and Claims go to Credentials in the main menu."
        title="Your Claims Verified Successfully."
      />
      <Row center mb={0}>
        <Button title="Go To Credentials" onPress={navigate} />
      </Row>
    </Container>
  );
}

VerifyCredentialSuccessScreen.propTypes = {
  navigation: PropTypes.shape({
    reset: PropTypes.func.isRequired,
  }).isRequired,
};

export default VerifyCredentialSuccessScreen;
