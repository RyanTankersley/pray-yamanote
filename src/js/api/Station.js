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
};

module.exports = Station;