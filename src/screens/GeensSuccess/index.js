import React from 'react';
import * as PropTypes from 'prop-types';
import {Container, StyledIllustration} from './styles';
import {Button, Title} from 'components';
import {IMAGES} from 'constants';
import {Row} from 'styles';

function GeensSuccessScreen(props) {
  const {navigation} = props;

  return (
    <Container>
      <Row mb={20}>
        <Title text="Success!" />
      </Row>
      <StyledIllustration
        image={IMAGES.CONNECTIONS_ILLUSTRATION}
        description="Defined.id account data will be backed up to Geens.com encrypted cloud and can be restored anytime on any device"
        title="Your Connection Was Established Successfully."
      />
      <Row center mb={0}>
        <Button title="OK" onPress={navigation.goBack} />
      </Row>
    </Container>
  );
}

GeensSuccessScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default GeensSuccessScreen;
