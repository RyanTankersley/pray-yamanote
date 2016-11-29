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

  getDistanceFromBeginning() {
    const startIndex = this.getStationByName(this.props.params.station).index;
    let distance = 0;

    if(this.isGoingClockwise() === true) {
      distance = (startIndex - this.state.currentIndex) + this.state.stations.length;
    } else {
      distance = this.state.currentIndex - startIndex;
    }

    if(distance < 0)
      distance += this.state.stations.length;
    
    if(distance >= this.state.stations.length)
      distance -= this.state.stations.length;
    
    //Accounts for index vs. position
    distance = distance + 1;
    return distance;
  }

  isGoingClockwise() {
    let clockwise = parseInt(this.props.params.isGoingClockwise);
    return isNaN(clockwise) || clockwise > 0;
  }

  changeStations(moveBack) {
    //When going opposite direction, need to flip left and right
    if(this.isGoingClockwise() === true) {
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
    const clockwise = this.isGoingClockwise();
    const icon = clockwise ? 'fa fa-rotate-right' : 'fa fa-rotate-left';
    return (
      <div>
        <PageHeader />
        <div style={{'padding': '10px','textAlign': 'center'}}>
          <img className="img-responsive" style={{'margin': 'auto', 'maxHeight': '300px'}} src='/images/yamanote-small.png' />
          <h2 style={{'fontWeight': 'bold', 'marginBottom': 0}}>{station.name}</h2>
          <p>By: {station.author}</p>
          <p style={{'marginBottom': '5px'}}>{this.getDistanceFromBeginning()} of {this.state.stations.length}</p>
          <i className={icon}></i>
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