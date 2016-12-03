'use strict';

import React from 'react';
import PageHeader from '../../shared/PageHeader.jsx';

class Login extends React.Component{
  render() {
    const buttonStyle = {
      width: '100px'
    };

    return(
      <div>
        <PageHeader />
        <div style={{'padding': '10px', 'textAlign': 'center'}}>
          <h3>Please choose a service to login through</h3>
          <div className="btn-group-vertical" role="group">
            <button className='btn btn-primary'>Facebook</button>
            <button className='btn btn-primary'>Google</button>
          </div>
        </div>
      </div>
    );
  }
};

module.exports = Login;