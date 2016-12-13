'use strict'

const ApiItem = require('../database/PrayerWalk.js');
const api = new ApiItem.WalkApi();

module.exports = function(router) {
  router.post('/walk/:name/:owner/:image', function(req, res) {
    let name = req.params.name;
    let owner = req.params.owner;
    let image = req.params.image;
    api.Create(name, owner, image, (response) => {
        res.send(response);
      });
  });

  router.put('/walk/:name/:newName/:owner/:image', function(req, res) {
    let name = req.params.name;
    let newName = req.params.newName
    let owner = req.params.owner;
    let image = req.params.image;
    api.Update(name, newName, owner, image, (response) => {
        res.send(response);
    });
  });

  router.get('/walk/:name/', function(req, res) {
    let name = req.params.name;
    api.Get(name, (response) => {
        res.send(response);
    });
  });

  router.delete('/walk/:name/', function(req, res) {
    let name = req.params.name;
    api.Delete(name, (response) => {
        res.send(response);
    });
  });
}