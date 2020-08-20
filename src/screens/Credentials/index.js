import React from 'react';
import * as PropTypes from 'prop-types';
import {Container, Footer, Header, ProfilePhotoContainer} from './styles';
import {Button, Tag} from 'components';
import {Row} from 'styles';
import {Credentials, ProfilePhoto} from 'containers';
import {NAVIGATORS, SCREENS} from 'navigation';
import autoBind from 'auto-bind';
import {connect} from 'react-redux';

class CredentialsScreen extends React.Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  componentDidMount(): void {
    const {navigation} = this.props;
    this.unsubscribe = navigation.addListener('focus', () => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onSelect(index) {
    const {navigation} = this.props;
    navigation.navigate(SCREENS.CREDENTIAL_DETAILS, {id: index});
  }

  navigateToAccount() {
    const {navigation} = this.props;
    navigation.navigate(NAVIGATORS.SETTINGS, {
      screen: SCREENS.SETTINGS,
    });
  }

  render() {
    const {navigation, unverifiedCredentials} = this.props;

    return (
      <Container>
        <Header>
          <Row mb={15} center>
            <ProfilePhotoContainer>
              <ProfilePhoto />
            </ProfilePhotoContainer>
          </Row>
          <Row mb={30} center>
            <Tag onPress={this.navigateToAccount} text="Build your profile" />
          </Row>
        </Header>
        <Credentials
          onNewCredentialPress={() =>
            navigation.navigate(SCREENS.NEW_CREDENTIAL)
          }
          onSelect={this.onSelect}
        />
        {unverifiedCredentials.length === 0 && (
          <Footer>
            <Button
              title="Create credential"
              onPress={() => navigation.navigate(SCREENS.NEW_CREDENTIAL)}
            />
          </Footer>
        )}
      </Container>
    );
  }
}

CredentialsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  unverifiedCredentials: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  const {credentials} = state;
  const {unverifiedCredentials} = credentials;
  return {unverifiedCredentials};
}

export default connect(mapStateToProps)(CredentialsScreen);
