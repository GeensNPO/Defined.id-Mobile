import React from 'react';
import BaseForm from '../BaseForm';
import autoBind from 'auto-bind';
import {BUTTONS, Row} from 'styles';
import {Button, DatePicker} from 'components';
import {Container, Content} from './styles';
import * as PropTypes from 'prop-types';
import update from 'immutability-helper';
import * as validations from 'utils';

class BirthDateForm extends BaseForm {
  validations = {
    birthDate: (value) =>
      validations.validBirthDate(value, 'Birth date is required'),
  };

  constructor(props) {
    super(props);

    this.state = {
      fields: {
        birthDate: {value: '', error: null, dirty: false},
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
            birthDate: {value: {$set: formData.birthDate}},
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
        birthDate: fields.birthDate.value,
      });
    }
  }

  render() {
    const {fields} = this.state;

    return (
      <Container>
        <Content>
          <Row mb={0}>
            <DatePicker
              label="Birth date"
              value={fields.birthDate.value}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              placeholder="2000-01-01"
              name="birthDate"
              error={fields.birthDate.error}
              dirty={fields.birthDate.dirty}
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

BirthDateForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    birthDate: PropTypes.string.isRequired,
  }).isRequired,
};

export default BirthDateForm;
