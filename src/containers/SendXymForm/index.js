import React from 'react';
import BaseForm from '../BaseForm';
import autoBind from 'auto-bind';
import {BUTTONS, Row} from 'styles';
import {Button, Input} from 'components';
import {Container, Content} from './styles';
import * as PropTypes from 'prop-types';
import * as validations from 'utils';

class SendXymForm extends BaseForm {
  validations = {
    address: (value) => validations.notEmpty(value, 'Address is required'),
    amount: (value) => validations.notEmpty(value, 'Amount is required'),
  };

  constructor(props) {
    super(props);

    this.state = {
      fields: {
        address: {value: '', error: null, dirty: false},
        amount: {value: '', error: null, dirty: false},
      },
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
        address: fields.address.value,
        amount: fields.amount.value,
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
              error={fields.address.error}
              dirty={fields.address.dirty}
              value={fields.address.value}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              placeholder="e.g. did.defined.123"
              label="NEM or Defined.id Address"
              name="address"
            />
          </Row>
          <Row mb={0}>
            <Input
              error={fields.amount.error}
              dirty={fields.amount.dirty}
              value={fields.amount.value}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              label="Amount"
              name="amount"
              keyboardType="numeric"
            />
          </Row>
        </Content>
        <Row center mb={0}>
          <Button
            type={BUTTONS.SECONDARY}
            disabled={this.hasErrors()}
            title="Send"
            onPress={this.save}
          />
        </Row>
      </Container>
    );
  }
}

SendXymForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SendXymForm;
