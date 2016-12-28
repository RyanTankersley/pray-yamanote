'use strict';

import React from 'react';
import {Link} from 'react-router';
import ErrorableComponent from '../../shared/ErrorableComponent.jsx';
import PageHeader from '../../shared/PageHeader.jsx';
import AuthRequired from '../../shared/AuthRequired.js';
import Errorable from '../../shared/Errorable.js';
import Loadable from '../../shared/Loadable.js';
import AccountApi from '../../../api/Account.js';
import WalkApi from '../../../api/Walk.js';

class Walk extends React.Component {
  render() {
    return (
      <Link to='creator' className='btn btn-primary' style={{'width': '75%'}}>{this.props.name}</Link>
    )
  }
}

class Walks extends React.Component {
  constructor(props) {
    super(props);

    this.errorable = new Errorable();
    this.errorable.setError(props.error);

    this.loadable = new Loadable();
    this.loadable.setLoading(this.props.walks === null);
  }

  render() {
    let content = null;

    if(this.errorable.hasError()) {
      content = this.errorable.renderError();
    } else if(this.loadable.isLoading()) {
      content = this.loadable.renderLoading();
    }
    else {
      content = (
        <ul style={{'listStyle': 'none', 'padding': 0}}>
          {this.props.walks.map((item) => {
            return (<li key={item.name} style={{'marginBottom': '5px'}}><Walk name={item.name} /></li>);
          })}
        </ul>
      )
    }
    
    return content;
  }
}

class Account extends React.Component{
  constructor() {
    super();
    this.authRequired = new AuthRequired();
    this.errorable = new Errorable();
    this.state = {
      walks: null,
    }
  }

  componentWillMount() {
    this.authRequired.handleComponentWillMount();
  }

  componentDidMount() {
    WalkApi.getWalksForUser(this.authRequired.account.email, (response) => {
      if(response.err) {
        this.errorable.setError(response.response);
        this.state.walks = null;
      } else {
        this.state.walks = response.response;
        this.errorable.clearError();
      }

      this.setState(this.state);
    });
  }

  render() {
    let content = null;
    if(!this.authRequired.isAuthorized()) {
      content = this.authRequired.getNotLoggedInRendering();
    }
    else if(this.errorable.hasError()) {
      content = this.errorable.renderError();
    } else {
      content = (
        <div style={{'padding': '10px', 'textAlign': 'center'}}>
          <h3>{`Welcome ${this.authRequired.account.fname} ${this.authRequired.account.lname}!`}</h3>
          <Link to='creator' className='btn btn-primary'>Create New Prayer Walk</Link>
          <h3>{`Your Prayer Walks`}</h3>
          <Walks walks={this.state.walks} error={this.state.error} />
        </div>);
    }

    return (
      <div>
        <PageHeader />
        {content}
      </div>
    );
  }
};

module.exports = Account;