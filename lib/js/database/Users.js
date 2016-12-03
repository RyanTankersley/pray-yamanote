'use strict'
const mongoose = require('mongoose');
const Response = require('../objects/Response.js');

const userSchema = mongoose.Schema({
    fname: String,
    lname: String,
    email: String
});

const User = mongoose.model('User', userSchema);

class UserApi {
  SaveUser(user, cb) {
    user.save((err, user) => {
      if(err) {
        return cb(Response.Error(err));
      }

      cb(Response.Success(user));
    });
  }

  Create(email, fname, lname, cb) {
    this.Get(email, (response) => {
      if(response.err) {
        return cb(response);
      }

      if(response.response !== null) {
        return cb(Response.Error(`User with email ${email} already exists.`));
      }

      let user = new User({fname: fname, lname: lname, email: email});
      this.SaveUser(user, cb);
    });
  }

  Update(email, fname, lname, cb) {
    this.Get(email, (response) => {
      if(response.err) {
        return cb(response);
      }

      if(response.response === null) {
        return cb(Response.Error(`User with email ${email} does not exist.`));
      }

      let user = response.response;
      user.fname = fname;
      user.lname = lname;
      user.email = email;
      this.SaveUser(user, cb);
    });
  }

  Get(email, cb) {
    User.find({email: email}, (err, users) => {
      if(err) {
        return cb(Response.Error(err));
      }

      let user = null;
      if(users.length !== 0)
        user = users[0];

      cb(Response.Success(user));
    });
  }

  Delete(email, cb) {
    this.Get(email, (response) => {
      if(response.err) {
        return cb(response);
      }

      if(response.response === null) {
        return cb(Response.Error(`User with email ${email} does not exist.`))
      }

      User.remove(response.response, (err) => {
        if(err) {
          return cb(Response.Error(err));
        }

        return cb(Response.Success({}));
      });
    })
  }


}

module.exports = UserApi;