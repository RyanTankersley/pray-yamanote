const $ = require('jquery');

let stations = null;
class Station {

  static getStations(cb) {

    if(stations !== null)
      cb(stations);

    $.get('/api/stations')
      .done((response) => {
        stations = {err: false, response: response};
        cb(stations);
      })
      .fail((response) => {
        cb({err: true, response: 'An error occurred while attempting to retrieve stations.'});
      });
  };
  
  static createWalk(name, owner, image, cb) {
    $.post(`/api/walk/${encodeURIComponent(name)}/${owner}/${encodeURIComponent(image)}/`)
      .done((response) => {
        cb(response);
      })
      .fail((response) => {
        cb(response);
      });
  };
  
  
  static getWalk(name, cb) {
    $.get(`/api/walk/${encodeURIComponent(name)}/`)
      .done((response) => {
        cb({err: false, response: response});
      })
      .fail((response) => {
        cb({err: true, response: 'An error occurred while attempting to retrieve stations.'});
      });
  };

  static getWalksForUser(user, cb) {
    $.get(`/api/userwalk/${encodeURIComponent(user)}/`)
      .done((response) => {
        stations = {err: false, response: response};
        cb(stations);
      })
      .fail((response) => {
        cb({err: true, response: 'An error occurred while attempting to retrieve stations.'});
      });
  }
};

module.exports = Station;