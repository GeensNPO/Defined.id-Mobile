import React from 'react';
import BaseForm from '../BaseForm';
import autoBind from 'auto-bind';
import {BUTTONS, Row} from 'styles';
import {Button, Input} from 'components';
import {Container, Content} from './styles';
import * as PropTypes from 'prop-types';
import update from 'immutability-helper';
import * as validations from 'utils';

class PhoneForm extends BaseForm {
  validations = {
    phone: (value) => validations.numeric(value, 'Phone is required'),
  };

  constructor(props) {
    super(props);

    this.state = {
      fields: {
        phone: {value: '', error: null, dirty: false},
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
            phone: {value: {$set: formData.phone}},
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
        phone: fields.phone.value,
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
              label="Phone"
              value={fields.phone.value}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              error={fields.phone.error}
              dirty={fields.phone.dirty}
              keyboardType="numeric"
              placeholder="eg. John"
              name="phone"
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

PhoneForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    phone: PropTypes.string.isRequired,
  }).isRequired,
};

export default PhoneForm;
