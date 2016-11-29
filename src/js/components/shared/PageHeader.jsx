'use strict';

const React = require('react');
class PageHeader extends React.Component{
  render() {
    const headerStyle = {
      'backgroundColor': 'black',
      'color': 'white',
      'paddingLeft': '20px'
    };

    return (
      <div className='row' style={headerStyle}>
        <div className='col-xs-12'>
          <h1>Pray Yamanote</h1>
        </div>
      </div>
    );
  }
};

module.exports = PageHeader;