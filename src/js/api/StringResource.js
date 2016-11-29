const $ = require('jquery');

let resources = null;
class StringResource {

  static getResources(cb) {

    if(resources !== null)
      cb(resources);

    $.get('/api/strings')
      .done((response) => {
        resources = {err: false, response: response};
        cb(resources);
      })
      .fail((response) => {
        cb({err: true, response: 'An error occurred while attempting to retrieve resources.'});
      });
  };
};

module.exports = StringResource;