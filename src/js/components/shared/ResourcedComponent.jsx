'use strict';

import PageHeader from '../shared/PageHeader.jsx';
import Loading from '../shared/Loading.jsx';
import StationList from '../shared/StationList.jsx';
import StringResource from '../../api/StringResource.js';
import Station from '../../api/Station.js';
import ResourceLoader from '../../objects/ResourceLoader.js';
const React = require('react');

class ResourcedComponent extends React.Component{
  constructor() {
    super();
    this.rl = new ResourceLoader();
    this.state = {
      stations: [],
      strings: null,
      error: null
    };
  }

  resourcesFinished(success) {
    this.state.stations = this.rl.stations;
    this.state.strings = this.rl.stringResources;
    this.state.error = this.rl.error;
    this.setState(this.state);
  }

  componentDidMount() {
    this.rl.loadResources((success) => this.resourcesFinished(success));
  }

  getAbnormalRendering() {
    if(this.state.error != null) {
      return this.renderError();
    } else if(this.state.stations.length === 0 || this.state.strings === null) {
      return this.renderLoading();
    } else {
      return null;
    }
  }

  render() {
    if(this.state.error != null) {
      return this.renderError();
    } else if(this.state.stations.length === 0 || this.state.strings === null) {
      return this.renderLoading();
    } else {
      return this.renderBlank();
    }
  }

  renderError() {
    return (
      <div>
        <PageHeader />
        <h3 className='text-danger' style={{'textAlign': 'center'}}>{this.state.error}</h3>
      </div>
    )
  }

  renderLoading() {
    return (
      <div>
        <PageHeader />
        <Loading />
      </div>
    );
  }

  renderBlank() {
    return (
      <div>
        <PageHeader />
      </div>
    );
  }
};

module.exports = ResourcedComponent;