const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../../config.js');
const userApiItem = require('../database/Users.js');
const userApi = new userApiItem();

module.exports = function(passport) {
  
passport.use(new FacebookStrategy({
    clientID: config.fb.id,
    clientSecret: config.fb.secret,
    callbackURL: 'http://localhost:5000/api/facebook/return',
    profileFields: ["emails", "displayName", "name"]
  },
  function(accessToken, refreshToken, profile, done) {
      const email = profile.emails[0].value;
      const fname = profile.name.givenName;
      const lname = profile.name.familyName;

      userApi.Get(email, (response) => {
        if(response.err) {
          return done(response);
        }

        if(response.response !== null) {
          return done(null, response.response);
        }

        userApi.Create(email, fname, lname, (response) => {
          if(response.err) {
            return done(response);
          }

          return done(null, response.response);
        })
      });
  }));


  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});
}