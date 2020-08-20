import React from 'react';
import autoBind from 'auto-bind';
import update from 'immutability-helper';

class BaseForm extends React.Component {
  validations = {};

  constructor(props) {
    super(props);

    this.state = {
      fields: {},
    };

    autoBind(this);
  }

  hasErrors() {
    const {fields} = this.state;
    const names = Object.keys(fields);
    return !!names.find((name) => fields[name].error !== null);
  }

  validateForm() {
    const {fields} = this.state;
    let valid = true;
    const names = Object.keys(fields);
    names.forEach((name) => {
      if (!this.validateField(name)) {
        valid = false;
      }
    });
    return valid;
  }

  handleBlur(event) {
    const {name} = event;
    this.setState((state) =>
      update(state, {
        fields: {
          [name]: {
            dirty: {$set: true},
          },
        },
      }),
    );
  }

  handleChange(event) {
    const {value, name} = event;
    const validationFunction = this.validations[name];
    this.setState((state) =>
      update(state, {
        fields: {
          [name]: {
            value: {$set: value},
            dirty: {$set: true},
            error: {
              $set: validationFunction ? validationFunction(value) : null,
            },
          },
        },
      }),
    );
  }

  validateField(name) {
    const {fields} = this.state;
    const validateFunction = this.validations[name];
    const error = validateFunction
      ? validateFunction(fields[name].value)
      : null;

    this.setState((state) =>
      update(state, {
        fields: {
          [name]: {
            error: {$set: error},
          },
        },
      }),
    );

    return !error;
  }
}

export default BaseForm;
