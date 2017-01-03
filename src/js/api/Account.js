const $ = require('jquery');

class Account {
  static getLoggedIn(cb) {
    $.get('/api/getLoggedInUser')
      .done((response) => {
        if(response.response.isLoggedIn)
          localStorage.setItem('account', JSON.stringify(response.response.user));
        else
          localStorage.setItem('account', null);

        cb(response.response);
      })
      .fail((response) => {
        console.log(response);
      });
  }
  
  static isLoggedIn() {
    const account = localStorage.getItem('account');
    const isLoggedIn = account !== null && account !== 'null' && account !== undefined && account !== 'undefined';
    return isLoggedIn;
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

      //If there is a value, ensure the user is still logged in online. If not, log them out 
      this.getLoggedIn((response) => {
        if(!response.isLoggedIn)
          localStorage.setItem('account', null);
      });

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