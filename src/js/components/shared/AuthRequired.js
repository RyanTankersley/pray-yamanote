'use strict';

import React from 'react';
import AccountApi from '../../api/Account.js';

class AuthRequired {
  constructor() {
    this.account = AccountApi.getAccount();
  }

  isAuthorized() {
    return AccountApi.isLoggedIn();
  }

  handleNotLoggedIn() {
    window.location.href = '/login';
  }

  getNotLoggedInRendering() {
    //If not logged in, will just be empty
    if(this.account === null)
      return (<div></div>);

    return null;
  }

  handleComponentWillMount() {
    if(!this.isAuthorized())
      this.handleNotLoggedIn();
  }
}

module.exports = AuthRequired;