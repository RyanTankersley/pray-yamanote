'use strict';

import React from 'react';

import PageHeader from '../../shared/PageHeader.jsx';
import AuthRequiredComponent from '../../shared/AuthRequiredComponent.jsx';
import AccountApi from '../../../api/Account.js';
import StationCreator from './StationCreator.jsx';

class WalkCreator extends AuthRequiredComponent{
  constructor() {
    super();
  }

  render() {
    const abnormal = this.getAbnormalAuthRendering();
    if(abnormal !== null) {
      return abnormal;
    } else {
      return this.renderMain();
    }
  }

  renderMain() {
    const labelStyle = {
      paddingRight: '5px'
    }
    return (
      <div>
        <PageHeader />
        <div style={{'padding': '10px', 'paddingTop': '0'}}>
          <h3 style={{'padding-left': '5px'}}>Create New Prayer Walk</h3>
          <div className='row' style={{'padding': '5px'}}>
            <label style={labelStyle}>Station Name</label><input id='name' type='text' />
          </div>
          <StationCreator stations={[]} />

          <div className="row" style={{'padding': '5px'}}>
            <button type="button" className="btn btn-danger" style={{'float': 'left', 'marginRight': '5px'}} onClick={(e) => this.props.onMove(true)}>Cancel</button>
            <button type="button" className="btn btn-success" onClick={(e) => this.onStartOver()}>Finish</button>
          </div>
        </div>
      </div>
    );
  }
};

module.exports = WalkCreator;