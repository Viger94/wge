'use strict';


// End of dependencies.


module.exports = function (req, res, next){
  req.isAuthenticated()
    ? next()
    : res.redirect('/');
};