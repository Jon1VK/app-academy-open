const { isEmpty, isLength, isEmail } = require('validator');

function validateRegisterInput({ handle = '', email = '', password = '' }) {
  const errors = {};

  if (!isLength(handle, { min: 2, max: 30 })) {
    errors.handle = 'Handle must be between 2 and 30 characters';
  }

  if (isEmpty(handle)) {
    errors.handle = 'Handle is required';
  }

  if (!isEmail(email)) {
    errors.email = 'Email is invalid';
  }

  if (isEmpty(email)) {
    errors.email = 'Email is required';
  }

  if (!isLength(password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 and at most 30 characters';
  }

  if (isEmpty(password)) {
    errors.password = 'Password is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

module.exports = validateRegisterInput;
