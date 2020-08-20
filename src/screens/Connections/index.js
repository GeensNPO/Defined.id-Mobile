import React from 'react';
import * as PropTypes from 'prop-types';
import {Container, Header, ProfilePhotoContainer} from './styles';
import {Tag} from 'components';
import {Row} from 'styles';
import {ProfilePhoto} from 'containers';
import {NAVIGATORS, SCREENS} from 'navigation';
import {Connections} from 'containers';

function ConnectionsScreen(props) {
  const {navigation} = props;

  const onSelect = (index) => {
    navigation.navigate(SCREENS.CONNECTION_DETAILS, {id: index});
  };

  const navigateToAccount = () => {
    navigation.navigate(NAVIGATORS.SETTINGS, {
      screen: SCREENS.SETTINGS,
    });
  };

  return (
    <Container>
      <Header>
        <Row mb={15} center>
          <ProfilePhotoContainer>
            <ProfilePhoto />
          </ProfilePhotoContainer>
        </Row>
        <Row mb={30} center>
          <Tag onPress={navigateToAccount} text="Build your profile" />
        </Row>
      </Header>
      <Connections onSelect={onSelect} />
    </Container>
  );
}

ConnectionsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default ConnectionsScreen;
