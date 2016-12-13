'use strict';

import React from 'react';

import PageHeader from '../shared/PageHeader.jsx';
import StationList from '../shared/StationList.jsx';
import RotationSelection from '../shared/RotationSelection.jsx';
import ResourcedComponent from '../shared/ResourcedComponent.jsx';
import AccountApi from '../../api/Account.js';

class Home extends ResourcedComponent{
  constructor() {
    super();
    this.state.isGoingClockwise = 0;
  }

  changeDirection(isGoingClockwise) {
    this.state.isGoingClockwise = isGoingClockwise;
    this.setState(this.state);
  }

  render() {
    const abnormal = this.getAbnormalRendering();
    if(abnormal !== null) {
      return abnormal;
    } else {
      return this.renderStations();
    }
  }

  renderStations() {
    return (
      <div>
        <PageHeader />
        <div style={{'padding': '10px'}}>
          <div style={{'textAlign': 'center'}}>
            <img className="img-responsive" style={{'margin': 'auto', 'maxHeight': '300px'}} src='/images/yamanote-small.png' />
          </div>
          <h3 style={{'textAlign': 'center'}}>{this.state.strings.rotation}</h3>
          <RotationSelection onChangeDirection={(isGoingClockwise) => this.changeDirection(isGoingClockwise)}/>
          <h3 style={{'textAlign': 'center'}}>{this.state.strings.homeHeader}</h3>
          <StationList stations={this.state.stations} isGoingClockwise={this.state.isGoingClockwise} />
        </div>
      </div>
    );
  }
};

module.exports = Home;