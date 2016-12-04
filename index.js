"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const config = require('./lib/config');
const passport = require('passport');
const cors = require('cors');
const session = require('express-session');
require('./lib/js/objects/PassportConfig.js')(passport);
require('./lib/js/database/Connection.js');
const usersApiItem = require('./lib/js/database/Users.js');
const usersApi = new usersApiItem();
var cookieParser = require('cookie-parser')
const app = express();

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({ secret: config.passportSecret,
    resave: true,
    saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
const router = express.Router();

router.get('/stations', function(req, res) {
  const file = __dirname + '/lib/data/english/stations.json';
  res.sendFile(file);
});

router.get('/strings', function(req, res) {
  const file = __dirname + '/lib/data/english/strings.json';
  res.sendFile(file);
});

router.post('/user/:email/:fname/:lname', function(req, res) {
  let email = req.params.email;
  let fname = req.params.fname;
  let lname = req.params.lname;
  usersApi.Create(email, fname, lname, (response) => {
      res.send(response);
  });
});

router.put('/user/:email/:fname/:lname', function(req, res) {
  let email = req.params.email;
  let fname = req.params.fname;
  let lname = req.params.lname;
  usersApi.Update(email, fname, lname, (response) => {
      res.send(response);
  });
});

router.get('/user/:email/', function(req, res) {
  let email = req.params.email;
  usersApi.Get(email, (response) => {
      res.send(response);
  });
});

router.delete('/user/:email/', function(req, res) {
  let email = req.params.email;
  usersApi.Delete(email, (response) => {
      res.send(response);
  });
});

router.get('/isLoggedIn', function(req, res) {
  res.send({err: false, response: req.isAuthenticated()});
});

router.get('/facebookdidstuff',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }));

app.use(express.static('public'));

app.use('/api', router);

app.get('/login', (req, res) => {
  const file = __dirname + '/login.html';
  res.sendFile(file);
})
app.get('/profile', isLoggedIn, function(req, res) {
  const file = __dirname + '/login.html';
  res.sendFile(file);
	});

app.listen(config.port);
console.log('Listening at port: ' + config.port);

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}