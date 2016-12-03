'use strict'
class Response {
  static Error(error) {
    return {err: true, response: error};
  }

  static Success(response) {
    return {err:false, response: response};
  }
}

module.exports = Response;