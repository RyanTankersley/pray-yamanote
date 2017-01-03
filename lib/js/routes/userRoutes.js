'use strict'

const ApiItem = require('../database/Users.js');
const api = new ApiItem();

module.exports = function(router) {
  router.post('/user/:email/:fname/:lname', function(req, res) {
  let email = req.params.email;
  let fname = req.params.fname;
  let lname = req.params.lname;
  api.Create(email, fname, lname, (response) => {
      res.send(response);
    });
  });

  router.put('/user/:email/:fname/:lname', function(req, res) {
    let email = req.params.email;
    let fname = req.params.fname;
    let lname = req.params.lname;
    api.Update(email, fname, lname, (response) => {
        res.send(response);
    });
  });

  router.get('/user/:email/', function(req, res) {
    let email = req.params.email;
    api.Get(email, (response) => {
        res.send(response);
    });
  });

  router.delete('/user/:email/', function(req, res) {
    let email = req.params.email;
    api.Delete(email, (response) => {
        res.send(response);
    });
  });
}