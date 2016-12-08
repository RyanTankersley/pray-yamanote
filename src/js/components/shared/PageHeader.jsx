'use strict';

import accountApi from '../../api/Account.js';
import React from 'react';
import {Link} from 'react-router';

class PageHeader extends React.Component{
  constructor() {
    super();
    this.state = {
      account: null
    }
  }

  componentDidMount() {
    accountApi.getLoggedIn((response) => {
      this.state.account = response;
      this.setState(this.state);
    })
  }

  logOut() {
    accountApi.logOut(() => {
      window.location.href = '/login';
    });
  }

  render() {
    
    const logInText = this.state.account != null ? `${this.state.account.fname} ${this.state.account.lname}` : 'Log In';
    const logInHref = this.state.account != null ? '/account' : '/login';

    let links = [(
                <li key='login'><Link to={logInHref}>{logInText}</Link></li>
                )];

    if(this.state.account != null)
      links.push((
        <li key='logout'><a onClick={(e) => this.logOut()}>Log Out</a></li>
      ));

    return (
      <nav className="navbar navbar-inverse">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/">Pray Yamanote</a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li><a href="/">Home</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
            {links.map((item) => {
              return item;
            })}
            </ul>
          </div>
      </nav>
    );
  }
};

module.exports = PageHeader;