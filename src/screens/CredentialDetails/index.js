import React from 'react';
import * as PropTypes from 'prop-types';
import {Container, SectionTitle, Section, Content} from './styles';
import {Button, ClaimStatus, SettingsButton} from 'components';
import {CLAIM_STATUSES, IMAGES} from 'constants';
import {Row} from 'styles';
import {connect} from 'react-redux';
import {SCREENS} from 'navigation';
import {DefinedService} from 'services';
import {Linking} from 'react-native';

function CredentialDetailsScreen(props) {
  const {route, unverifiedCredentials, navigation} = props;
  const credential = unverifiedCredentials[route.params.id];

  const verifyCredential = () => {
    navigation.navigate(SCREENS.VERIFY_CREDENTIAL, {id: route.params.id});
  };

  const openUrl = () => {
    const hash = credential.transaction;
    const url = DefinedService.createExplorerURL(hash);
    Linking.openURL(url);
  };

  return (
    <Container>
      <Content>
        <Row center mb={30}>
          <ClaimStatus
            timestampDate={credential.timestampDate}
            creationDate={credential.creationDate}
            expirationDate={credential.expirationDate}
          />
        </Row>
        <SectionTitle>Title</SectionTitle>
        <Row mb={25}>
          <SettingsButton
            reversed
            image={
              credential.status === CLAIM_STATUSES.UNVERIFIED
                ? IMAGES.CIRCLE_DENIED
                : IMAGES.CIRCLE_ACCEPTED
            }
            description={credential.description}
            title={credential.title}
          />
        </Row>
        {credential.claims && credential.claims.length > 0 && (
          <Section>
            <SectionTitle>Claims</SectionTitle>
            {credential.claims.map((item, index) => (
              <Row key={index} mb={10}>
                <SettingsButton
                  reversed
                  image={
                    item.status === CLAIM_STATUSES.UNVERIFIED
                      ? IMAGES.CIRCLE_DENIED
                      : IMAGES.CIRCLE_ACCEPTED
                  }
                  description={item.content}
                  title={item.title}
                />
              </Row>
            ))}
          </Section>
        )}
        {credential.credentials && credential.credentials.length > 0 && (
          <Section>
            <SectionTitle>Credentials</SectionTitle>
            {credential.credentials.map((item, index) => (
              <Row key={index} mb={10}>
                <SettingsButton
                  reversed
                  image={
                    item.status === CLAIM_STATUSES.UNVERIFIED
                      ? IMAGES.CIRCLE_DENIED
                      : IMAGES.CIRCLE_ACCEPTED
                  }
                  description={item.description}
                  title={item.title}
                />
              </Row>
            ))}
          </Section>
        )}
      </Content>
      {credential.status === CLAIM_STATUSES.VERIFIED && (
        <Row center>
          <Button onPress={openUrl} title="Check transaction" />
        </Row>
      )}
      {credential.status === CLAIM_STATUSES.UNVERIFIED && (
        <Row center>
          <Button onPress={verifyCredential} title="Verify" />
        </Row>
      )}
    </Container>
  );
}

CredentialDetailsScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape.isRequired,
  }).isRequired,
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

export default connect(mapStateToProps)(CredentialDetailsScreen);
