'use strict'

const passport = require('passport');

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
    res.send({err: false, response: req.session.passport.user});
  });
}