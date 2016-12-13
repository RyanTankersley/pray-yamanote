'use strict'
const mongoose = require('mongoose');
const EmailValidator = require('../objects/Validators/EmailValidator.js');

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

module.exports = walkSchema;