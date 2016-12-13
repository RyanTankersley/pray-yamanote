'use strict'
const mongoose = require('mongoose');
const Response = require('../objects/Response.js');
const ValidatorResponse = require('../objects/Validators/ValidatorResponse.js');
const EmailValidator = require('../objects/Validators/EmailValidator.js');
const NotEmptyValidator = require('../objects/Validators/NotEmptyValidator.js');

const walkSchema = mongoose.Schema({
    name: {type: String, required: [true, 'Name is required']},
    owner: {
      type: String, 
      required: [true, 'Owner is required'],
      validate: {
        validator: function(v) {
          return EmailValidator(v).isValid;
        },
        message: 'Owner email {VALUE} is not valid.'
      }
    },
    editors: [{
      id: {
        type: String, 
        required: [true, 'Editor email is required'],
        validate: {
          validator: function(v) {
            return EmailValidator(v).isValid;
          },
          message: 'Editor email {VALUE} is not valid.'
        }
      }
    }],
    isPublic: Boolean,
    image: {type: String, required: [true, 'Image is required']},
    stations: [{
      index: Number,
      image: {type: String, required: [true, 'Image is required']},
      description: [{text: {type: String, required: [true, 'Text is required on description']}}],
      prayerPoints: [{text: {type: String, required: [true, 'Text is required on prayer point.']}}]
    }]
});

walkSchema.methods.getErrorList = function() {
  let errors = [];
  const errorList = this.validateSync();
  if(errorList === undefined) return errors;
  console.log(errorList.message);
  for (var name in errorList.errors) {
    errors.push(errorList.errors[name].message);
  }

  return errors;
}
const Walk = mongoose.model('Walk', walkSchema);

class WalkApi {
  Save(o, cb) {
    const errors = o.getErrorList();
      if(errors.length === 0) {
        o.save((err, o) => {
          if(err) {
            return cb(Response.Error(err));
          }

          cb(Response.Success(o));
        });
      }
      else {
        cb(Response.Error(`Walk is invalid. ${errors[0]}`));
      }
  }

  Create(name, owner, image, cb) {
    this.Get(name, (response) => {
      if(response.err) {
        return cb(response);
      }

      if(response.response !== null) {
        return cb(Response.Error(`Walk with name ${name} already exists.`));
      }

      let walk = new Walk({name: name, owner: owner, image: image, isPublic: false, editors: [], stations: []});
      
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

        if(name !== newName && newResponse.response !== null) {
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

module.exports = {WalkApi, walkSchema};