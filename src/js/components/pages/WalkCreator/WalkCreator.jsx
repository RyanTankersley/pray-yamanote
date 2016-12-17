'use strict';

import React from 'react';
import mongoose from 'mongoose';

import PageHeader from '../../shared/PageHeader.jsx';
import ValidationInput from '../../shared/ValidationInput.jsx';
import AuthRequiredComponent from '../../shared/AuthRequiredComponent.jsx';
import AccountApi from '../../../api/Account.js';
import StationApi from '../../../api/Station.js';
import StationCreator from './StationCreator.jsx';
import { browserHistory } from 'react-router';
import walkSchema from '../../../../../lib/js/database/PrayerWalkSchema.js';


class WalkCreator extends AuthRequiredComponent{
  constructor() {
    super();
    this.state.name = "";
    this.state.image = "";
    this.state.imageError = false;
    this.state.nameHasHadValue = false;
    this.state.imageHasHadValue = false;
  }

  render() {
    const abnormal = this.getAbnormalAuthRendering();
    if(abnormal !== null) {
      return abnormal;
    } else {
      return this.renderMain();
    }
  }

  onNameChange(text) {
    this.state.nameHasHadValue = true;
    this.state.name = text;
    this.setState(this.state);
  }

  onImageChange(text, me) {
    this.state.imageHasHadValue = true;
    this.state.imageError = false;
    this.state.image = text;
    this.setState(this.state);
  }

  onCancel() {
    browserHistory.push("/account");
  }

  onFinish() {
    this.state.nameHasHadValue = true;
    this.state.imageHasHadValue = true;
    if(this.isValid()) {
      const account = AccountApi.getAccount();
      StationApi.createWalk(this.state.name, account.email, this.state.image);
      browserHistory.push("/account");
    }
    
    this.setState(this.state);
  }

  getMongoDocFromState(thismethisowner, image) {
    var account = AccountApi.getAccount();
    return this.getMongoDoc(this.state.name, account.email, this.state.image);
  }

  getMongoDoc(name, owner, image) {
    let doc = new mongoose.Document({name: name, owner: owner, image: image}, walkSchema);
    return doc;
  }

  testImage(text) {
    const image = new Image();
    image.addEventListener("error", (e) => {
      console.log('rawr');
      this.state.imageError = true;
      this.setState(this.state);
    });;

    image.src = text;
  }

  getFormInput(labelName, hasError, placeholder, value, onChange, errorText) {
    const formGroupClass = 'form-group' + (hasError ? ' has-error' : '');
    const inputStyle = {
      maxWidth: '500px'
    };

    let error = null;
    if(hasError) {
      error = (<p className='text-danger'>{errorText}</p>)
    }
    return (
      <div className={formGroupClass}>
        <label>{labelName}</label>
        <input style={inputStyle} type="text" className="form-control" id={labelName} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value, this)} />
        {error}
      </div>
    );
  }

  nameHasError() {
    if(!this.state.nameHasHadValue) return false;

    let errors = this.getMongoDocFromState().validateSync();
    return errors !== undefined && errors.errors['name'] !== undefined ? true : false;
  }

  imageHasError() {
    if(!this.state.imageHasHadValue) return false;
    if(this.state.imageError) return true;

    let errors = this.getMongoDocFromState().validateSync();
    return errors !== undefined && errors.errors['image'] !== undefined ? true : false;
  }

  isValid() {
    return !this.imageHasError() && !this.nameHasError();
  }

  getImage() {
    let image = null;

    if(!this.state.imageError && this.state.image !== "") {
      this.testImage(this.state.image);
      image = (<img src={this.state.image} style={{'maxWidth': '500px', 'width': '100%'}}/>);
    }

    return image;
  }

  getFinishButton(enabled) {
    const type = 'button';
    const className = 'btn btn-success';
    const text = 'Finish';
    const handler = (e) => this.onFinish();
    
    let finishButton = null;
    if(enabled)
      finishButton = (<button type={type} className={className} onClick={handler}>{text}</button>);
    else
      finishButton = (<button type={type} className={className} onClick={handler} disabled>{text}</button>);

    return finishButton;
  }

  renderMain() {
    return (
      <div>
        <PageHeader />
        <div style={{'padding': '10px', 'paddingTop': '0'}}>
          <h3>Create New Prayer Walk</h3>
          <form>
            <ValidationInput labelName='Prayer Walk Name' hasError={this.nameHasError()} placeholder='Ex. Around the City' 
                             value={this.state.name} onChange={(e) => this.onNameChange(e.target.value)} errorText='Name cannot be empty'/>
            <ValidationInput labelName='Link to Image' hasError={this.imageHasError()} placeholder='Ex. http://www.photobucket.com/1234/aroundthecity.jpg' 
                             value={this.state.image} onChange={(e) => this.onImageChange(e.target.value)} errorText='Image link invalid.'/>
          </form>
          {this.getImage()}
          <div className="row">
            <button type="button" className="btn btn-danger" style={{'float': 'left', 'marginRight': '5px'}} onClick={(e) => this.onCancel()}>Cancel</button>
            {this.getFinishButton(this.isValid())}
          </div>
        </div>
      </div>
    );
  }
};

module.exports = WalkCreator;