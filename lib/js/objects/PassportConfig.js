const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../../config.js');
const userApiItem = require('../database/Users.js');
const userApi = new userApiItem();

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
      done(null, user.email);
  });
  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    userApi.Get(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(
    new FacebookStrategy({
      clientID: config.fb.id,
      clientSecret: config.fb.secret,
      callbackURL: "http://localhost:5000/api/facebookdidstuff",
      profileFields: ["emails", "displayName", "name"]
    },
    function(accessToken, refreshToken, profile, done) {
      console.log('here');
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);
    }
  ));
}