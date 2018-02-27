/* eslint-disable no-new */
import { Validator } from 'vee-validate';

Validator.extend('is_regex', {
  getMessage: field => `The ${field} is not a valid regex.`,
  validate: value => new Promise((resolve) => {
    let isValid = true;
    try {
      new RegExp(value);
    } catch (e) {
      isValid = false;
    }
    resolve({
      valid: isValid,
    });
  }),
});


Validator.extend('is_regex', {
  getMessage: field => `The ${field} is not a valid regex.`,
  validate: value => new Promise((resolve) => {
    let isValid = true;
    try {
      new RegExp(value);
    } catch (e) {
      isValid = false;
    }
    resolve({
      valid: isValid,
    });
  }),
});

export default {
  display_name: {
    required: true,
  },
  default_value: {
    required: true,
  },
  custom_validation: {
    required: true,
    is_regex: true,
  },
  reference_name: {
    required: true,
    regex: new RegExp(/^[A-Za-z][A-Za-z0-9]*$/),
  },
};
