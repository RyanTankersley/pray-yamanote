'use strict'

const ApiItem = require('../database/PrayerWalk.js');
const AuthMiddleware = require('../objects/AuthMiddleware.js');
const api = new ApiItem();

module.exports = function(router) {
  router.post('/walk/:name/:owner/:image', AuthMiddleware.IsAuthorized, function(req, res) {
    let name = req.params.name;
    let owner = req.params.owner;
    let image = req.params.image;
    api.Create(name, owner, image, (response) => {
        res.send(response);
      });
  });

  router.put('/walk/:name/:newName/:owner/:image', AuthMiddleware.IsAuthorized, function(req, res) {
    let name = req.params.name;
    let newName = req.params.newName
    let owner = req.params.owner;
    let image = req.params.image;
    api.Update(name, newName, owner, image, (response) => {
        res.send(response);
    });
  });

  router.get('/walk/:name/', function(req, res) {
    console.log(req.session.passport);
    let name = req.params.name;
    api.Get(name, (response) => {
      if(response.err)
        return res.send(response);

      if(response.response.isManager(req.session.passport.user))
        res.send(response);
    });
  });

  router.delete('/walk/:name/', AuthMiddleware.IsAuthorized, function(req, res) {
    let name = req.params.name;
    api.Delete(name, (response) => {
        res.send(response);
    });
  });

  router.get('/userwalk/:user/', function(req, res) {
    let user = req.params.user;
    api.GetWalksForUser(user, (response) => {
        res.send(response);
    });
  });
}