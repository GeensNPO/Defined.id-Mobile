import React from 'react';
import BaseForm from '../BaseForm';
import autoBind from 'auto-bind';
import {BUTTONS, Row} from 'styles';
import {Button, Input} from 'components';
import {Container, Content} from './styles';
import * as PropTypes from 'prop-types';
import update from 'immutability-helper';
import * as validations from 'utils';

class AddressForm extends BaseForm {
  validations = {
    country: (value) => validations.notEmpty(value, 'Country is required'),
    city: (value) => validations.notEmpty(value, 'City is required'),
    firstAddressLine: (value) =>
      validations.notEmpty(value, 'First address line is required'),
  };

  constructor(props) {
    super(props);

    this.state = {
      fields: {
        country: {value: '', error: null, dirty: false},
        city: {value: '', error: null, dirty: false},
        firstAddressLine: {value: '', error: null, dirty: false},
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
            country: {value: {$set: formData.country}},
            city: {value: {$set: formData.city}},
            firstAddressLine: {value: {$set: formData.firstAddressLine}},
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
        country: fields.country.value,
        city: fields.city.value,
        firstAddressLine: fields.firstAddressLine.value,
      });
    }
  }

  render() {
    const {fields} = this.state;

    return (
      <Container>
        <Content>
          <Row mb={20}>
            <Input
              label="Country"
              value={fields.country.value}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              name="country"
              error={fields.country.error}
              dirty={fields.country.dirty}
            />
          </Row>
          <Row mb={20}>
            <Input
              label="Address Line 1"
              value={fields.firstAddressLine.value}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              name="firstAddressLine"
              error={fields.firstAddressLine.error}
              dirty={fields.firstAddressLine.dirty}
            />
          </Row>
          <Row mb={0}>
            <Input
              label="City"
              value={fields.city.value}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              error={fields.city.error}
              dirty={fields.city.dirty}
              name="city"
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

AddressForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    country: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    firstAddressLine: PropTypes.string.isRequired,
  }).isRequired,
};

export default AddressForm;
