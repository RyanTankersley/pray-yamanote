'use strict';

import React from 'react';
import { browserHistory } from 'react-router';

class StationBrowser extends React.Component{
  onStartOver() {
    browserHistory.push("/");
    window.scrollTo(0, 0);
  }

  render() {
    const iconStyle = {
      fontSize: '20px'
    };

    return(
      <div className="btn-group" role="group">
        <button type="button" className="btn btn-primary" onClick={(e) => this.props.onMove(true)}><i className='fa fa-arrow-left' style={iconStyle}></i></button>
        <button type="button" className="btn btn-primary" onClick={(e) => this.onStartOver()}>Start Over</button>
        <button type="button" className="btn btn-primary" onClick={(e) => this.props.onMove(false)}><i className='fa fa-arrow-right' style={iconStyle}></i></button>
      </div>
    );
  }
};

module.exports = StationBrowser;