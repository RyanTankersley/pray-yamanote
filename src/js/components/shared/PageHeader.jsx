'use strict';

import accountApi from '../../api/Account.js';
import React from 'react';
import {Link} from 'react-router';

class PageHeader extends React.Component{
  constructor() {
    super();
    this.state = {
      isLoggedIn: accountApi.isLoggedIn()
    }
  }

  render() {
    
    const logInText = this.state.isLoggedIn ? `${accountApi.getAccount().fname} ${accountApi.getAccount().lname}` : 'Log In';
    const logInHref = this.state.isLoggedIn ? '/account' : '/login';

    return (
      <nav className="navbar navbar-inverse">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Pray Yamanote</a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li><a href="/">Home</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to={logInHref}>{logInText}</Link>
              </li>
            </ul>
          </div>
      </nav>
    );
  }
};

module.exports = PageHeader;