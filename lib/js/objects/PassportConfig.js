const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../../config.js');
const userApiItem = require('../database/Users.js');
const userApi = new userApiItem();

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    console.log('here');
      done(null, user.email);
  });
  
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
      console.log(profile);
      const email = profile.emails[0].value;
      const fname = profile.name.givenName;
      const lname = profile.name.familyName;

      console.log(email);

      userApi.Get(email, (response) => {
        if(response.err) {
          return done(response);
        }

        if(response.response !== null) {
          console.log('user exists');
          return done(null, response.response);
        }

          console.log('creating user');
        userApi.Create(email, fname, lname, (response) => {
          console.log('created user');
          if(response.err) {
            return done(response);
          }

          return done(null, response.response);
        })
      });
    }
  ));
}