import React from 'react'
import { Router, Route, browserHistory, DefaultRoute, NotFoundRoute, Redirect } from 'react-router'
const HomePage = require('./components/pages/Home.jsx');
const PrayerStation = require('./components/pages/PrayerStation/PrayerStation.jsx');
const Login = require('./components/pages/Login/Login.jsx');
const Account = require('./components/pages/Account/Account.jsx');
const WalkCreator = require('./components/pages/WalkCreator/WalkCreator.jsx');
const WalkManager = require('./components/pages/WalkCreator/WalkManager.jsx');

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={HomePage} />
    <Route path="/station/:station/:isGoingClockwise" component={PrayerStation} />
    <Route path="/login" component={Login} />
    <Route path="/account" component={Account} />
    <Route path="/creator" component={WalkCreator} />
    <Route path="/manager/:name" component={WalkManager} />
  </Router>
);

module.exports = routes;