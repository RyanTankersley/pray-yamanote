'use strict';

import React from 'react';

class StationRow extends React.Component {

  getMoveButton(up, enabled) {
    const iconStyle = {
      fontSize: '20px'
    };

    const iconClass = 'fa fa-arrow-' + (up ? 'up' : 'down');
    const buttonClass = 'btn btn-info';

    if(enabled)
      return (<button type="button" className={buttonClass} onClick={(e) => this.props.onMove(up ? true : false)}><i className={iconClass} style={iconStyle}></i></button>);

    return <button type="button" className={buttonClass} onClick={(e) => this.props.onMove(up ? true : false)} disabled><i className={iconClass} style={iconStyle}></i></button>
  }

  render() {
    const upEnabled = this.props.index !== 0;
    const downEnabled = !this.props.isLast;
    return (
      <div className='row' style={{'padding': '5px'}}>
        <h4 style={{'fontWeight': 'bold', 'marginBottom': '2px'}}>{this.props.name}</h4>
        <div className="btn-group" role="group">
          <button type="button" className="btn btn-primary" onClick={(e) => this.props.onMove(true)}>Edit</button>
          <button type="button" className="btn btn-danger" onClick={(e) => this.onStartOver()}>Del</button>
          {this.getMoveButton(false, downEnabled)}
          {this.getMoveButton(true, upEnabled)}
        </div>
      </div>
    );
  }
}

module.exports = StationRow;