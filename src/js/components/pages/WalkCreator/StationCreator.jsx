'use strict';

import React from 'react';
import StationRow from './StationRow.jsx';

class StationCreator extends React.Component {
  constructor() {
    super();
    this.state = {
      stations: []
    }
  }

  componentDidMount() {
    this.state.stations = this.props.stations;
    this.setState(this.state);
  }

  addStation() {
    this.state.stations.push({name: 'New Station'});
    this.setState(this.state);
  }

  render() {
    const stations = this.state.stations;
    return (
      <div>
        {stations.map((station) => {
          const index = stations.indexOf(station);
          return (<StationRow name={station.name} key={index} index={index} isLast={index + 1 === stations.length} />);
        })}
        <div className='row' style={{'marginTop': '5px', 'padding': '5px'}}>
          <button type='button' className='btn btn-primary' onClick={(e) => this.addStation()}>Add Station</button>
        </div>
      </div>
    );
  }
}

module.exports = StationCreator;