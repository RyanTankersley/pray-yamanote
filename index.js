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

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: config.passportSecret, resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
const router = express.Router();

const routeLocations = [
'./lib/js/routes/staticFileRoutes.js',
'./lib/js/routes/userRoutes.js',
'./lib/js/routes/authRoutes.js',
'./lib/js/routes/prayerWalkRoutes.js'
];

routeLocations.map((location) => {
  require(location)(router);
});

app.use(express.static('public'));

app.use('/api', router);

app.get('/*', (req, res) => {
  const file = __dirname + '/index.html';
  res.sendFile(file);
});

app.listen(config.port);
console.log('Listening at port: ' + config.port);