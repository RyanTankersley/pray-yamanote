'use strict'

module.exports = function(router) {
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

  router.get('/getLoggedInUser', function(req, res) {
    res.send({err: false, response: req.session.passport.user});
  });
}