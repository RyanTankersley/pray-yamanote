'use strict';

import React from 'react';
import {Link} from 'react-router';
import ErrorableComponent from '../../shared/ErrorableComponent.jsx';
import PageHeader from '../../shared/PageHeader.jsx';
import AuthRequiredComponent from '../../shared/AuthRequiredComponent.jsx';
import Loading from '../../shared/Loading.jsx';
import AccountApi from '../../../api/Account.js';
import WalkApi from '../../../api/Walk.js';

class Walk extends React.Component {
  render() {
    return (
      <Link to='creator' className='btn btn-primary' style={{'width': '75%'}}>{this.props.name}</Link>
    )
  }
}

class Walks extends ErrorableComponent {
  constructor() {
    super();
  }

  render() {
    let toRender = this.getErrorRender();
    if(toRender !== null) {
      return toRender;
    }
    
    let walks = null;
    if(this.props.walks === null) {
      return (<Loading />);
    } else {
      return (
        <ul style={{'listStyle': 'none', 'padding': 0}}>
          {this.props.walks.map((item) => {
            return (<li key={item.name} style={{'marginBottom': '5px'}}><Walk name={item.name} /></li>);
          })}
        </ul>
      )
    }
  }
}

class Account extends AuthRequiredComponent{
  constructor() {
    super();
    this.state.walks = null;
    this.state.error = null;
  }

  componentDidMount() {
    this.rl.loadResources((success) => this.resourcesFinished(success));
    WalkApi.getWalksForUser(AccountApi.getAccount().email, (response) => {
      if(response.err) {
        this.state.error = response.response;
        this.state.walks = null;
      } else {
        this.state.walks = response.response;
        this.state.error = null;
      }

      this.setState(this.state);
    });
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
          <Walks walks={this.state.walks} error={this.state.error} />
        </div>
      </div>
    );
  }
};

module.exports = Account;