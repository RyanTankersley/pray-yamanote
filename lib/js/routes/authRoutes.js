'use strict'

const passport = require('passport');
const AuthMiddleware = require('../objects/AuthMiddleware.js');
const UserApiItem = require('../database/Users.js');
const userApi = new UserApiItem();
const Response = require('../objects/Response.js');

module.exports = function(router) {
  router.get('/facebook/return', 
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    });

  router.get('/facebook', passport.authenticate('facebook'));

  router.get('/logOut', function(req, res) {
    req.logOut();
    res.send({err: false});
  });

  router.get('/getLoggedInUser', function(req, res) {
    let toReturn = null;

    if(AuthMiddleware.IsLoggedIn(req)) {
      userApi.Get(req.session.passport.user.email, (response) => {
        res.send(Response.Success({isLoggedIn: true, user: response.response}));
      });
    }
    else
      res.send(Response.Success({isLoggedIn: false, user: null}));
  });
}