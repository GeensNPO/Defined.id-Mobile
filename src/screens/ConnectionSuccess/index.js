import React from 'react';
import * as PropTypes from 'prop-types';
import {Container, StyledIllustration} from './styles';
import {Button, Title} from 'components';
import {IMAGES} from 'constants';
import {Row} from 'styles';

function ConnectionSuccessScreen(props) {
  const {navigation} = props;

  const navigate = () => {
    navigation.pop();
  };

  return (
    <Container>
      <Row mb={20}>
        <Title text="Success!" />
      </Row>
      <StyledIllustration
        image={IMAGES.CONNECTIONS_ILLUSTRATION}
        description="To check the status or to update your connections and certificates go to Connections in the main menu."
        title="Your Connection Was Established Successfully."
      />
      <Row center mb={0}>
        <Button title="Go To Connections" onPress={navigate} />
      </Row>
    </Container>
  );
}

ConnectionSuccessScreen.propTypes = {
  navigation: PropTypes.shape({
    pop: PropTypes.func.isRequired,
  }).isRequired,
};

export default ConnectionSuccessScreen;
