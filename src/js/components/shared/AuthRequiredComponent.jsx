'use strict';

import React from 'react';

import ResourcedComponent from '../shared/ResourcedComponent.jsx';
import AccountApi from '../../api/Account.js';

class AuthRequiredComponent extends ResourcedComponent{
  constructor() {
    super();
    this.state.account = AccountApi.getAccount();
  }

  componentWillMount() {
    var li = !AccountApi.isLoggedIn(); 
    if(li) {
      window.location.href = '/login';
    }
  }

  getAbnormalAuthRendering() {
    if(this.state.account === null) {
      return this.renderBlank();
    }

    return this.getAbnormalRendering();
  }

  renderNotLoggedIn() {
    //If not logged in, will just be empty
    if(this.state.account === null)
      return (<div></div>);
  }

  render() {
    this.renderBlank();
  }
};

module.exports = AuthRequiredComponent;