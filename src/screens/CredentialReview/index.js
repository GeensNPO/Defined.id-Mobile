import React from 'react';
import * as PropTypes from 'prop-types';
import {Container, SectionTitle, Content, Footer} from './styles';
import {connect} from 'react-redux';
import {Button, Description, Input, SettingsButton} from 'components';
import {BUTTONS, Row} from 'styles';
import {CLAIM_STATUSES, IMAGES} from 'constants';
import {credentials as actions} from 'actions';
import {NAVIGATORS} from 'navigation';

function CredentialReviewScreen(props) {
  const {customCredential, createCredential, navigation} = props;
  const {credentials, title} = customCredential;

  const create = () => {
    createCredential(customCredential);
    navigation.reset({
      routes: [{name: NAVIGATORS.MAIN}],
    });
  };

  const createAndVerify = () => {
    createCredential(customCredential, true);
  };

  return (
    <Container>
      <Row mb={20} center>
        <Description text="Review and confirm details listed below" />
      </Row>
      <Row mb={20} center>
        <Input
          value={title}
          onChange={() => {}}
          label="Title"
          name="title"
          disabled
        />
      </Row>
      <Row mb={20} center>
        <SectionTitle>{credentials.length} Claim/s</SectionTitle>
      </Row>
      <Content>
        {credentials.map((credential, index) => (
          <Row key={index}>
            <SettingsButton
              image={
                credential.status === CLAIM_STATUSES.UNVERIFIED
                  ? IMAGES.CIRCLE_DENIED
                  : IMAGES.CIRCLE_ACCEPTED
              }
              title={credential.title}
              description={credential.description}
              reversed
            />
          </Row>
        ))}
      </Content>
      <Footer>
        <Row center>
          <Button onPress={create} title="Create" />
        </Row>
        <Row mb={0} center>
          <Button
            type={BUTTONS.SECONDARY}
            onPress={createAndVerify}
            title="Create & Verify"
          />
        </Row>
      </Footer>
    </Container>
  );
}

CredentialReviewScreen.propTypes = {
  navigation: PropTypes.shape({
    reset: PropTypes.func.isRequired,
  }).isRequired,
  customCredential: PropTypes.object.isRequired,
  createCredential: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const {credentials} = state;
  const {customCredential} = credentials;
  return {customCredential};
}

export default connect(mapStateToProps, {
  createCredential: actions.createCredential,
})(CredentialReviewScreen);
