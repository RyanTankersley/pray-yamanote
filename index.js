"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const config = require('./lib/config');
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
require('./lib/js/database/Connection.js');
const usersApiItem = require('./lib/js/database/Users.js');
const usersApi = new usersApiItem();

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

app.use(express.static('public'));

app.use('/api', router);

app.get('/*', (req, res) => {
  const file = __dirname + '/index.html';
  res.sendFile(file);
});

app.listen(config.port);
console.log('Listening at port: ' + config.port);