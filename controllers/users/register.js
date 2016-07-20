'use strict';
var mongoose = require('mongoose');
//Load all your models
var User = require('../../models/users.js');


var User           = require('mongoose').model('user');

// End of dependencies.


module.exports = function(req, res, next) {
  var user = new User({ username: req.body.email, password: req.body.password});
  user.save(function(err) {
    return err
      ? next(err)
      : req.login(user, function(err) {
        return err
          ? next(err)
          : res.redirect('/game');
      });
  });
};