'use strict';

import React from 'react';

class InformationItem extends React.Component {
  render() {
    const iconStyle = {
      fontSize: '20px'
    };

    return(
      <div className='container'>
        <h3>{this.props.name}</h3>
        <ul>
          {this.props.points.map((item) => {
            return (<li style={{'fontSize': 'larger'}} key={this.props.points.indexOf(item)}>{item}</li>);
          })}
        </ul>
      </div>
    );
  }
};

class StationInformation extends React.Component {
  render() {
    return(
      <div>
        <InformationItem name="Description" points={this.props.desc} />
        <InformationItem name="Prayer Points" points={this.props.prayerPoints} />
      </div>
    );
  }
};

module.exports = StationInformation;