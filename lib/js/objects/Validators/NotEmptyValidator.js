'use strict'

const ValidatorResponse = require('./ValidatorResponse.js');

module.exports = function(value, identifier) {
  if(value === null || value === undefined || value === "") return ValidatorResponse.Invalid(`${Identifier} cannot be empty.`);

  return ValidatorResponse.Valid();
}