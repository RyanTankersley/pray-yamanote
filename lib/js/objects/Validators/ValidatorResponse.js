'use strict'
class ValidatorResponse {
  static Invalid(reason) {
    return {isValid: false, reason: reason};
  }

  static Valid() {
    return {isValid: true};
  }
}

module.exports = ValidatorResponse;