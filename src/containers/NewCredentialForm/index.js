import React from 'react';
import BaseForm from '../BaseForm';
import autoBind from 'auto-bind';
import {BUTTONS, Row} from 'styles';
import {
  Button,
  ClaimsPicker,
  CustomClaimModal,
  Description,
  Input,
  SettingsButton,
} from 'components';
import {Container, Content, Footer, SectionTitle, OrText} from './styles';
import * as PropTypes from 'prop-types';
import * as validations from 'utils';
import {CLAIM_STATUSES, IMAGES} from 'constants';

class NewCredentialForm extends BaseForm {
  validations = {
    title: (value) => validations.notEmpty(value, 'Title is required'),
    credentials: (value) =>
      validations.hasElements(value, 'At least 1 claim is required'),
  };

  constructor(props) {
    super(props);

    this.state = {
      fields: {
        title: {value: '', error: null, dirty: false},
        credentials: {value: [], error: null, dirty: false},
      },
      claimsPickerVisible: false,
      customClaimModalVisible: false,
    };

    autoBind(this);
  }

  componentDidMount() {
    this.validateForm();
  }

  save() {
    const {onSubmit} = this.props;
    const {fields} = this.state;

    if (this.validateForm()) {
      onSubmit({
        title: fields.title.value,
        status: CLAIM_STATUSES.UNVERIFIED,
        description: `${fields.credentials.value.length} claims`,
        credentials: fields.credentials.value,
      });
    }
  }

  submitCustomClaimForm(formData) {
    const {fields} = this.state;
    const credentials = fields.credentials.value;
    credentials.push(formData);
    this.handleChange({value: credentials, name: 'credentials'});
    this.closeCustomClaimModal();
  }

  submitExistingClaimForm(formData) {
    const {fields} = this.state;
    let credentials = fields.credentials.value;
    credentials = credentials.concat(formData);
    this.handleChange({value: credentials, name: 'credentials'});
    this.closeClaimsPicker();
  }

  openClaimsPicker() {
    this.setState({
      claimsPickerVisible: true,
    });
  }

  closeClaimsPicker() {
    this.setState({
      claimsPickerVisible: false,
    });
  }

  openCustomClaimModal() {
    this.setState({
      customClaimModalVisible: true,
    });
  }

  closeCustomClaimModal() {
    this.setState({
      customClaimModalVisible: false,
    });
  }

  removeCredential(index) {
    const {fields} = this.state;
    const credentials = fields.credentials.value;
    credentials.splice(index, 1);
    this.handleChange({value: credentials, name: 'credentials'});
  }

  render() {
    const {fields, claimsPickerVisible, customClaimModalVisible} = this.state;

    return (
      <Container>
        <Content>
          <Row mb={35}>
            <Input
              error={fields.title.error}
              dirty={fields.title.dirty}
              label="Title"
              placeholder="Enter title"
              value={fields.title.value}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              name="title"
            />
          </Row>
          <Row mb={20} center>
            <SectionTitle>Add Claims</SectionTitle>
          </Row>
          <Row center mb={30}>
            <Button
              type={BUTTONS.SECONDARY}
              small
              onPress={this.openCustomClaimModal}
              title="Create new"
            />
            <OrText>or</OrText>
            <Button
              small
              onPress={this.openClaimsPicker}
              title="Add Existing"
            />
          </Row>
          {fields.credentials.value.length > 0 && (
            <Footer>
              <Row mb={20} center>
                <SectionTitle>
                  {fields.credentials.value.length} Claim/s Added
                </SectionTitle>
              </Row>
              {fields.credentials.value.map((credential, index) => (
                <Row key={index}>
                  <SettingsButton
                    onPress={() => this.removeCredential(index)}
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
            </Footer>
          )}
        </Content>
        <Footer>
          <Row mb={20}>
            <Description
              center
              text="Start by creating New or selecting Existing Claims"
            />
          </Row>
          <Button
            type={BUTTONS.SECONDARY}
            disabled={this.hasErrors()}
            title="Create Credential"
            onPress={this.save}
          />
        </Footer>
        <ClaimsPicker
          onSubmit={this.submitExistingClaimForm}
          visible={claimsPickerVisible}
          onClose={this.closeClaimsPicker}
        />
        <CustomClaimModal
          onSubmit={this.submitCustomClaimForm}
          onClose={this.closeCustomClaimModal}
          visible={customClaimModalVisible}
        />
      </Container>
    );
  }
}

NewCredentialForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default NewCredentialForm;
