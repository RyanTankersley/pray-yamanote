'use strict';

import React from 'react';
import {Link} from 'react-router';
import PageHeader from '../../shared/PageHeader.jsx';
import AuthRequiredComponent from '../../shared/AuthRequiredComponent.jsx';
import AccountApi from '../../../api/Account.js';

class Account extends AuthRequiredComponent{
  constructor() {
    super();
  }


  render() {
    const abnormal = this.getAbnormalAuthRendering();
    if(abnormal !== null) {
      return abnormal;
    } else {
      return this.renderAccount();
    }
  }

  renderAccount() {
    return (
      <div>
        <PageHeader />
        <div style={{'padding': '10px', 'textAlign': 'center'}}>
          <h3>{`Welcome ${this.state.account.fname} ${this.state.account.lname}!`}</h3>
          <Link to='creator' className='btn btn-primary'>Create New Prayer Walk</Link>
          <h3>{`Your Prayer Walks`}</h3>
        </div>
      </div>
    );
  }
};

module.exports = Account;