import React from 'react';
import BaseForm from '../BaseForm';
import autoBind from 'auto-bind';
import {BUTTONS, Row} from 'styles';
import {Button, Input} from 'components';
import {Container, Content} from './styles';
import * as PropTypes from 'prop-types';
import update from 'immutability-helper';
import * as validations from 'utils';

class EmailForm extends BaseForm {
  validations = {
    email: (value) => validations.validEmail(value, 'Email is required'),
  };

  constructor(props) {
    super(props);

    this.state = {
      fields: {
        email: {value: '', error: null, dirty: false},
      },
    };

    autoBind(this);
  }

  componentDidMount() {
    const {formData} = this.props;
    this.setForm(formData);
  }

  setForm(formData) {
    this.setState(
      (state) =>
        update(state, {
          fields: {
            email: {value: {$set: formData.email}},
          },
        }),
      () => this.validateForm(),
    );
  }

  save() {
    const {onSubmit} = this.props;
    const {fields} = this.state;

    if (this.validateForm()) {
      onSubmit({
        email: fields.email.value,
      });
    }
  }

  render() {
    const {fields} = this.state;

    return (
      <Container>
        <Content>
          <Row mb={0}>
            <Input
              label="Email"
              value={fields.email.value}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              error={fields.email.error}
              dirty={fields.email.dirty}
              placeholder="eg. John"
              name="email"
            />
          </Row>
        </Content>
        <Row center mb={0}>
          <Button
            type={BUTTONS.SECONDARY}
            disabled={this.hasErrors()}
            title="Save"
            onPress={this.save}
          />
        </Row>
      </Container>
    );
  }
}

EmailForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default EmailForm;
