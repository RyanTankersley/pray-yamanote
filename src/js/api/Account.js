const $ = require('jquery');

class Account {
  static getLoggedIn(cb) {
    const account = this.getAccount();
    if(account !== null) {
      return cb(account);
    }
    
    $.get('/api/getLoggedInUser')
      .done((response) => {
        localStorage.setItem('account', JSON.stringify(response.response));
        cb(response.response);
      })
      .fail((response) => {
        console.log(response);
      });
  }
  
  static isLoggedIn() {
    const account = localStorage.getItem('account');
    return account !== null && account !== undefined && account !== 'undefined';
  }

  static logOut(cb) {
    $.get('/api/logOut')
      .done((response) => {
        localStorage.setItem('account', null);
        cb();
      })
      .fail((response) => {
        console.log(response);
      });
  }

  static getAccount() {
    if(this.isLoggedIn()) {
      const account = JSON.parse(localStorage.getItem('account'));
      return account;
    }
    
    return null;
  }
  static isAdmin() {
    const account = localStorage.getItem('account');
    return account === null ? false : account.isAdmin;
  };
};

module.exports = Account;