'use strict';

const React = require('react');
//hasError
//labelName
//placeholder
//errorText
//onChange
//value
class ValidationInput extends React.Component{
  render() {
    const formGroupClass = 'form-group' + (this.props.hasError ? ' has-error' : '');
    const inputStyle = {
      maxWidth: '500px'
    };

    let error = null;
    if(this.props.hasError) {
      error = (<p className='text-danger'>{this.props.errorText}</p>)
    }
    return (
      <div className={formGroupClass}>
        <label>{this.props.labelName}</label>
        <input style={inputStyle} type="text" className="form-control" id={this.props.labelName} placeholder={this.props.placeholder} 
        value={this.props.value} onChange={this.props.onChange} />
        {error}
      </div>
    );
  }
};

module.exports = ValidationInput;