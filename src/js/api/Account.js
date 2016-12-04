const $ = require('jquery');

let account = null;
class Account {

  static logIn(cb) {
    console.log('logging in');
    $.get('/api/facebook')
      .done((response) => {
        console.log(response);
      })
      .fail((response) => {
        console.log(response);
      });
    // account = {
    //   isAdmin: true,
    //   email: 'ry.tankersley@gmail.com',
    //   fname: 'Ryan',
    //   lname: 'Tankersley'
    // }
  }

  static getAccount(cb) {

    if(account != null) return cb(account);
    $.get('/api/getLoggedInUser')
      .done((response) => {
        account = response;
        console.log(response);
        cb(response);
      })
      .fail((response) => {
        console.log(response);
      });
  }
  
  static isLoggedIn(cb) {
    
  }

  static isAdmin() {
    return account === null ? false : account.isAdmin;
  };
};

module.exports = Account;