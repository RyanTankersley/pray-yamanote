'use strict'

const ValidatorResponse = require('./ValidatorResponse.js');
const NotEmptyValidator = require('./NotEmptyValidator.js');
var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

module.exports = function(email, identifier) {
  const notEmptyResponse = NotEmptyValidator(email, identifier);
  if(!notEmptyResponse.isValid) return notEmptyResponse;

  const isEmail = emailRegex.test(email);
  if(!isEmail) return ValidatorResponse.Invalid(`${identifier} is not a valid email.`);
  return ValidatorResponse.Valid();
}