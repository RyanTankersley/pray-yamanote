'use strict';

import Station from '../../api/Station.js';
import {Link} from 'react-router';

const React = require('react');
const _ = require('lodash');

class StationItem extends React.Component{
  render() {
    const buttonStyle = {
      'width': '100%',
      'margin': '5px',
      'maxWidth': '500px'
    };

    var linkTo=`/station/${this.props.name}/${this.props.isGoingClockwise}`; 
    return (
      <Link to={linkTo}>
        <button className='btn btn-lg btn-primary' style={buttonStyle}>
          {this.props.name}
        </button>
      </Link>
    );
  }
};

class StationList extends React.Component{
  render() {
    const headerStyle = {
      'paddingLeft': '5px'
    };

    return (
      <div>
        <div className='row' style={headerStyle}>
          <div className='col-xs-12' style={{'textAlign': 'center'}}>
            {this.props.stations.map((station) => {
              return (<StationItem name={station.name} isGoingClockwise={this.props.isGoingClockwise} key={station.index}/>);
            })}
          </div>
        </div>
      </div>
    );
  }
};

module.exports = StationList;