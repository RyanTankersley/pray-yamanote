'use strict';

import React from 'react';

class ErrorableComponent extends React.Component {
  getErrorRender() {
    if(this.props.error !== null) {
      this.renderError();
    } else {
      return null;
    }  
  }

  renderError() {
    return (
      <p className='text-danger'>{this.props.error}</p>
    )
  }

  //Should be overriden
  render() {
    return (<div></div>);
  }
}

module.exports = ErrorableComponent;