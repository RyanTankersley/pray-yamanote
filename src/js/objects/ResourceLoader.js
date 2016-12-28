
import StringResource from '../api/StringResource.js';
import Station from '../api/Station.js';

class ResourceLoader {
  constructor() {
    this.stringResources = null;
    this.stations = [];
    this.error = null;
  }

  getWalks(user, cb) {
    Station.getWalksForUser(user, cb);
  }

  getStations(cb) {
    Station.getStations((response) => {
      if(response.err) {
        this.error = response.response;
      } else {
        this.stations = [];
        for(var i = 0; i < response.response.stations.length; i++)
          this.stations.push(response.response.stations[i]);
      }
      
      cb(this.error === null);
    });
  }

  getStringResources(cb) {
    StringResource.getResources((response) => {
      if(response.err) {
        this.error = response.response;
      } else {
        this.stringResources = response.response;
      }

      this.getStations(cb);
    });
  }

  loadResources(cb) {
    this.getStringResources(cb);
  }
}

module.exports = ResourceLoader;