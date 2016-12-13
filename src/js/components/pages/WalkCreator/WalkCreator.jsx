'use strict';

import React from 'react';
import mongoose from 'mongoose';

import PageHeader from '../../shared/PageHeader.jsx';
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
    this.state.name = text;
    this.setState(this.state);
  }

  onImageChange(text) {
    this.state.imageError = false;
    this.state.image = text;
    this.setState(this.state);
  }

  onCancel() {
    browserHistory.push("/account");
  }

  onFinish() {
    var account = AccountApi.getAccount();
    if(this.state.name !== "" && this.state.image !== "" && this.state.imageError !== true && this.validate(this.state.name, account.email, this.state.image)) {
      console.log(account);
      StationApi.createWalk(this.state.name, account.email, this.state.image);
      browserHistory.push("/account");
    }
  }

  validate(name, owner, image) {
    let doc = new mongoose.Document({name: name, owner: owner, image: image});
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

  renderMain() {
    const inputStyle = {
      maxWidth: '500px'
    };

    let image = null;
    if(!this.state.imageError && this.state.image !== "") {
      this.testImage(this.state.image);
      image = (<img src={this.state.image} style={{'maxWidth': '500px', 'width': '100%'}}/>);
    }

    if(this.state.imageError) {
      image = (<p className='text-danger'>Invalid image link</p>);
    }

    return (
      <div>
        <PageHeader />
        <div style={{'padding': '10px', 'paddingTop': '0'}}>
          <h3>Create New Prayer Walk</h3>
          <form>
            <div className="form-group">
              <label>Prayer Walk Name</label>
              <input style={inputStyle} type="text" className="form-control" id="name" placeholder="Ex. Around the City" value={this.state.name} onChange={(e) => this.onNameChange(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Link to Image</label>
              <input style={inputStyle} type="text" className="form-control" id="name" placeholder="Ex. http://www.photobucket.com/1234/aroundthecity.jpg" value={this.state.image} onChange={(e) => this.onImageChange(e.target.value)} />
            </div>
          </form>
          {image}
          <div className="row">
            <button type="button" className="btn btn-danger" style={{'float': 'left', 'marginRight': '5px'}} onClick={(e) => this.onCancel()}>Cancel</button>
            <button type="button" className="btn btn-success" onClick={(e) => this.onFinish()}>Finish</button>
          </div>
        </div>
      </div>
    );
  }
};

module.exports = WalkCreator;