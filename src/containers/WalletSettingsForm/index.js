import React from 'react';
import BaseForm from '../BaseForm';
import autoBind from 'auto-bind';
import {Row} from 'styles';
import {ClipboardText} from 'components';
import {Container, Content} from './styles';
import * as PropTypes from 'prop-types';
import update from 'immutability-helper';
import * as validations from 'utils';

class WalletSettingsForm extends BaseForm {
  validations = {
    secretKey: (value) => validations.notEmpty(value, 'Secret key is required'),
  };

  constructor(props) {
    super(props);

    this.state = {
      fields: {
        secretKey: {value: '', error: null, dirty: false},
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
            secretKey: {value: {$set: formData.secretKey}},
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
        secretKey: fields.secretKey.value,
      });
    }
  }

  render() {
    const {
      formData: {address},
    } = this.props;

    return (
      <Container>
        <Content>
          <ClipboardText label="Address" value={address} />
        </Content>
      </Container>
    );
  }
}

WalletSettingsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    secretKey: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
};

export default WalletSettingsForm;
