import React from 'react';
import BaseForm from '../BaseForm';
import autoBind from 'auto-bind';
import {BUTTONS, Row} from 'styles';
import {Button, Input} from 'components';
import {Container, Content} from './styles';
import * as PropTypes from 'prop-types';
import update from 'immutability-helper';
import * as validations from 'utils';

class NameAndSurnameForm extends BaseForm {
  validations = {
    name: (value) => validations.notEmpty(value, 'Name is required'),
    surname: (value) => validations.notEmpty(value, 'Surname is required'),
  };

  constructor(props) {
    super(props);

    this.state = {
      fields: {
        name: {value: '', error: null, dirty: false},
        surname: {value: '', error: null, dirty: false},
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
            name: {value: {$set: formData.name}},
            surname: {value: {$set: formData.surname}},
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
        name: fields.name.value,
        surname: fields.surname.value,
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
              error={fields.name.error}
              dirty={fields.name.dirty}
              label="Given Name(s)"
              value={fields.name.value}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              placeholder="eg. John"
              name="name"
            />
          </Row>
          <Row mb={0}>
            <Input
              error={fields.surname.error}
              dirty={fields.surname.dirty}
              label="Family Name/ Surname"
              value={fields.surname.value}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              placeholder="eg. John"
              name="surname"
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

NameAndSurnameForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
  }).isRequired,
};

export default NameAndSurnameForm;
