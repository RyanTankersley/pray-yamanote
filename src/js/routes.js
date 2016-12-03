import React from 'react'
import { Router, Route, browserHistory, DefaultRoute, NotFoundRoute, Redirect } from 'react-router'
const HomePage = require('./components/pages/Home.jsx')
const PrayerStation = require('./components/pages/PrayerStation/PrayerStation.jsx')
const Login = require('./components/pages/Login/Login.jsx')
const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={HomePage} />
    <Route path="/station/:station/:isGoingClockwise" component={PrayerStation} />
    <Route path="/login" component={Login} />
  </Router>
);

module.exports = routes;