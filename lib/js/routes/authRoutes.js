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
}