'use strict';

import React from 'react';
import PageHeader from '../../shared/PageHeader.jsx';
import AccountApi from '../../../api/Account.js';

class Login extends React.Component{
  componentWillMount() {
    if(AccountApi.isLoggedIn())
      window.location.href = '/account';
  }

  render() {
    return(
      <div>
        <PageHeader />
        <div style={{'padding': '10px', 'textAlign': 'center'}}>
          <h3>Please choose a service to login through</h3>
          <div className="btn-group-vertical" role="group">
            <a className="btn btn-block btn-social btn-facebook" href='/api/facebook'>
              <span className="fa fa-facebook"></span>
              Sign in with Facebook
            </a>
          </div>
        </div>
      </div>
    );
  }
};

module.exports = Login;