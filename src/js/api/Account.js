const $ = require('jquery');

class Account {
  static getAccount(cb) {
    if(window.account != null) return cb(window.account);
    $.get('/api/getLoggedInUser')
      .done((response) => {
        window.account = response.response;
        if(window.account === undefined)
          window.account = null;
        cb(window.account);
      })
      .fail((response) => {
        console.log(response);
      });
  }
  
  static isLoggedIn() {
    return window.account !== null;
  }

  static isAdmin() {
    return window.account === null ? false : window.account.isAdmin;
  };
};

module.exports = Account;