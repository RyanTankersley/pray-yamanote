'use strict'

module.exports = function(router) {
  router.get('/stations', function(req, res) {
    const file = __dirname + '/data/english/stations.json';
    res.sendFile(file);
  });

  router.get('/strings', function(req, res) {
    const file = __dirname + '/data/english/strings.json';
    res.sendFile(file);
  });
}