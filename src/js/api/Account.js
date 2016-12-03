const $ = require('jquery');

let account = null;
class Account {

  static logIn(cb) {
    account = {
      isAdmin: true,
      email: 'ry.tankersley@gmail.com',
      fname: 'Ryan',
      lname: 'Tankersley'
    }
  }

  static getAccount() {
    return account;
  }
  
  static isLoggedIn() {
    return account != null;
  }

  static isAdmin() {
    return account === null ? false : account.isAdmin;
  };
};

module.exports = Account;