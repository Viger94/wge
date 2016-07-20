'use strict';


var passport       = require('passport');

// End of dependencies.


module.exports = function(req, res, next) {

  log.info('someone trying to login');

  passport.authenticate('local',
    function(err, user, info) {
      log.info('user:', user);
      return err 
        ? next(err)
        : user
          ? req.logIn(user, function(err) {
              return err
                ? next(err)
                : res.redirect('/game');
            })
          : res.redirect('/fail');
    }
  )(req, res, next);

};