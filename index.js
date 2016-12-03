"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const config = require('./lib/config');
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = express.Router();

router.get('/stations', function(req, res) {
    const file = __dirname + '/lib/data/english/stations.json';
    res.sendFile(file);
});

router.get('/strings', function(req, res) {
    const file = __dirname + '/lib/data/english/strings.json';
    res.sendFile(file);
});


passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://www.example.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(..., function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));
app.use(express.static('public'));

app.use('/api', router);

app.get('/*', (req, res) => {
    const file = __dirname + '/index.html';
    res.sendFile(file);
});

app.listen(config.port);
console.log('Listening at port: ' + config.port);