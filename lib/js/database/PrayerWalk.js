'use strict'
const mongoose = require('mongoose');
const Response = require('../objects/Response.js');

const walkSchema = mongoose.Schema({
    name: String,
    owner: String,
    editors: [{id: String}],
    isPublic: Boolean,
    image: String,
    stations: [{
      index: Number,
      image: String,
      description: [{text: String}],
      prayerPoints: [{text: String}]
    }]

});

const Walk = mongoose.model('Walk', walkSchema);

class WalkApi {
  Save(o, cb) {
    o.save((err, o) => {
      if(err) {
        return cb(Response.Error(err));
      }

      cb(Response.Success(o));
    });
  }

  Create(name, owner, image, cb) {
    this.Get(name, (response) => {
      if(response.err) {
        return cb(response);
      }

      if(response.response !== null) {
        return cb(Response.Error(`Walk with name ${name} already exists.`));
      }

      let walk = new Walk({name: name, owner: owner, image: owner, isPublic: false, editors: [], stations: []});
      this.Save(walk, cb);
    });
  }

  Update(name, newName, owner, image, cb) {
    this.Get(name, (response) => {
      if(response.err) {
        return cb(response);
      }

      if(response.response === null) {
        return cb(Response.Error(`Walk with name ${name} does not exist.`));
      }

      this.Get(newName, (newResponse) => {
        if(response.err) {
          return cb(response);
        }

        if(newResponse.response !== null) {
          return cb(Response.Error(`Walk with name ${name} already exist.`));
        }

        let walk = response.response;
        walk.name = newName;
        walk.owner = owner;
        walk.image = image;
        this.Save(walk, cb);
      });
    });
  }

  Get(name, cb) {
    Walk.find({name: name}, (err, os) => {
      if(err) {
        return cb(Response.Error(err));
      }

      let o = null;
      if(os.length !== 0)
        o = os[0];

      cb(Response.Success(o));
    });
  }

  Delete(name, cb) {
    this.Get(name, (response) => {
      if(response.err) {
        return cb(response);
      }

      if(response.response === null) {
        return cb(Response.Error(`Walk with name ${name} does not exist.`))
      }

      Walk.remove(response.response, (err) => {
        if(err) {
          return cb(Response.Error(err));
        }

        return cb(Response.Success({}));
      });
    })
  }


}

module.exports = WalkApi;