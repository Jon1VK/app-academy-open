const validator = require('validator');

function validateTweetInput({ text = '' }) {
  let errors = {};

  if (!validator.isLength(text, { min: 5, max: 140 })) {
    errors.text = 'Tweet must be between 5 and 140 characters';
  }

  if (validator.isEmpty(text)) {
    errors.text = 'Text field is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

module.exports = validateTweetInput;
