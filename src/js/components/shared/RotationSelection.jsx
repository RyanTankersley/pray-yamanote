'use strict';

const React = require('react');
class RotationSelection extends React.Component{
  constructor() {
    super();
    this.state = {
      clockwise: false
    };
  }

  directionClicked(clockwise) {
    this.state.clockwise = clockwise;
    this.setState(this.state);
    if(this.props.onChangeDirection !== null)
      this.props.onChangeDirection(clockwise);
  }

  render() {
    const btnClass = 'btn btn-lg ';
    const leftClass = btnClass + (this.state.clockwise ? '' : 'btn-primary');
    const rightClass = btnClass + (!this.state.clockwise ? '' : 'btn-primary');
    
    return (
      <div className='row'>
        <div className='col-xs-6' style={{'textAlign': 'right'}}>
          <button role='button' className={leftClass} onClick={(e) => this.directionClicked(0)}><i className='fa fa-rotate-left'></i></button>
        </div>
        <div className='col-xs-6' style={{'textAlign': 'left'}}>
          <button role='button' className={rightClass} onClick={(e) => this.directionClicked(1)}><i className='fa fa-rotate-right'></i></button>
        </div>
      </div>
    );
  }
};

module.exports = RotationSelection;