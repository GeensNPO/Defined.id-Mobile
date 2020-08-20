import _ from 'lodash';

const notEmpty = (value, errorMessage) =>
  !value || _.trim(value).length === 0 ? errorMessage : null;

const hasElements = (value, errorMessage) =>
  value.length === 0 ? errorMessage : null;

const numeric = (value, errorMessage) => {
  const isEmpty = notEmpty(value, errorMessage);

  if (isEmpty) {
    return isEmpty;
  }

  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return regex.test(String(value).toLowerCase()) ? null : 'Field is invalid';
};

const validEmail = (value, errorMessage) => {
  const isEmpty = notEmpty(value, errorMessage);

  if (isEmpty) {
    return isEmpty;
  }

  const regex = /\S+@\S+\.\S+/;
  return regex.test(String(value).toLowerCase()) ? null : 'Email is invalid';
};

const validBirthDate = (value, errorMessage) => {
  const date = new Date(value);
  const currentDate = new Date();

  const isEmpty = notEmpty(value, errorMessage);

  if (isEmpty) {
    return isEmpty;
  }

  if (currentDate.getTime() <= date.getTime()) {
    return 'Birth date can not be in the future';
  }

  return null;
};

export {notEmpty, validEmail, validBirthDate, numeric, hasElements};
