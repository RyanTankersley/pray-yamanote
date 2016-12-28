const $ = require('jquery');

class Walk {
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
        cb(response);
      })
      .fail((response) => {
        cb({err: true, response: 'An error occurred while attempting to retrieve stations.'});
      });
  };

  static getWalksForUser(user, cb) {
    $.get(`/api/userwalk/${encodeURIComponent(user)}/`)
      .done((response) => {
        cb(response);
      })
      .fail((response) => {
        cb({err: true, response: 'An error occurred while attempting to retrieve stations.'});
      });
  }
};

module.exports = Walk;