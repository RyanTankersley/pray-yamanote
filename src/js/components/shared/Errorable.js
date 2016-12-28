'use strict';

import React from 'react';

class Errorable {
  consructor() {
    this.error = null;
  }
  
  hasError() {
    return this.error !== null && this.error !== undefined;
  }

  setError(error) {
    this.error = error;
  }

  clearError() {
    this.error = null;
  }

  renderError() {
    return (<p className='text-danger'>{this.error}</p>);
  }
}

module.exports = Errorable;