'use strict';

import React from 'react';
import PageHeader from '../../shared/PageHeader.jsx';
import AccountApi from '../../../api/Account.js';

class Login extends React.Component{

  logIn() {
    AccountApi.logIn(() => {
      console.log('hello'); 
    })
  }
  render() {
    const buttonStyle = {
      width: '100px'
    };

    return(
      <div>
        <PageHeader />
        <div style={{'padding': '10px', 'textAlign': 'center'}}>
          <h3>Please choose a service to login through</h3>
          <div className="btn-group-vertical" role="group">
            <a className='btn btn-primary' href='/api/facebook'>Facebook</a>
            <button className='btn btn-primary'>Google</button>
          </div>
        </div>
      </div>
    );
  }
};

module.exports = Login;