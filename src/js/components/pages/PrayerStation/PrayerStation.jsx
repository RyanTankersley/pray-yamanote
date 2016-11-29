'use strict';

import React from 'react';

import PageHeader from '../../shared/PageHeader.jsx';
import StationBrowser from './StationBrowser.jsx';
import StationInformation from './StationInformation.jsx';
import ResourcedComponent from '../../shared/ResourcedComponent.jsx';
import _ from 'lodash';

class PrayerStation extends ResourcedComponent{
  constructor() {
    super();
    this.state.currentIndex = null;
  }

  render() {
    const abnormal = this.getAbnormalRendering();
    if(abnormal !== null) {
      return abnormal;
    } else {
      return this.renderStation();
    }
  }

  getStationByName(name) {
    return _.find(this.state.stations, (station) => {
      return station.name === name;
    });
  }

  getStationByIndex(index) {
    return _.find(this.state.stations, (station) => {
      return station.index === index;
    });
  };

  getCurrentStation() {
    if(this.state.currentIndex === null) {
      const station = this.getStationByName(this.props.params.station);
      this.state.currentIndex = station.index;
      return station;
    } else {
      return this.getStationByIndex(this.state.currentIndex);
    }
  }

  changeStations(moveBack) {
    //When going opposite direction, need to flip left and right
    let clockwise = parseInt(this.props.params.isGoingClockwise);
    clockwise = isNaN(clockwise) || clockwise > 0;
    if(clockwise === true) {
      moveBack = !moveBack;
    }

    this.state.currentIndex = moveBack ? this.state.currentIndex - 1 : this.state.currentIndex + 1;
    if(this.state.currentIndex < 0)
      this.state.currentIndex = this.state.stations.length - 1;
    if(this.state.currentIndex === this.state.stations.length)
      this.state.currentIndex = 0;

    this.setState(this.state);
  }

  renderStation() {
    window.scrollTo(0, 0);
    const station = this.getCurrentStation();
    return (
      <div>
        <PageHeader />
        <div style={{'padding': '10px','textAlign': 'center'}}>
          <img className="img-responsive" style={{'margin': 'auto'}} src='/images/yamanote-small.png' />
          <h2 style={{'fontWeight': 'bold'}}>{station.name}</h2>
          <p>By: {station.author}</p>
          <div style={{'textAlign': 'left'}}>
            <StationInformation desc={station.desc} prayerPoints={station.prayerPoints} />
          </div>
          <StationBrowser onMove={(isLeft) => this.changeStations(isLeft)} />
        </div>
      </div>
    );
  }
};

module.exports = PrayerStation;