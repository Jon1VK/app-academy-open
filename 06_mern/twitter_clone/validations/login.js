const { isEmpty, isEmail } = require('validator');

function validateLoginInput({ email = '', password = '' }) {
  const errors = {};

  if (!isEmail(email)) {
    errors.email = 'Email is invalid';
  }

  if (isEmpty(email)) {
    errors.email = 'Email is required';
  }

  if (isEmpty(password)) {
    errors.password = 'Password is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

module.exports = validateLoginInput;
