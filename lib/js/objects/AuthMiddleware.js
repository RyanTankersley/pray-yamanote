'use strict';

class AuthMiddleware {
  static IsLoggedIn(req) {
    const user = req.session.passport.user;
    const isLoggedIn = user !== null && user !== undefined;
    return isLoggedIn;
  }

  static IsAuthorized(req, res, next) {
    if(!this.IsLoggedIn(req))
      return res.send('401', 'Not Authenticated');

    next();
  }
}

module.exports = AuthMiddleware;