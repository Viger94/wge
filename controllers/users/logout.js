'use strict';


// End of dependencies.


module.exports = function(req, res) {
  req.logout();
  res.redirect('/');
};