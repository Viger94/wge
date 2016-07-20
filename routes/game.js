var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('game', { title: 'Game | WGE 0.0.1a' });
});
router.get('/step1', function(req, res, next) {
  res.render('step1', { title: 'Game Step 1 | WGE 0.0.1a' });
});
router.get('/step2', function(req, res, next) {
  res.render('step2', { title: 'Game Step 2 | WGE 0.0.1a' });
});
router.get('/step3', function(req, res, next) {
  res.render('step3', { title: 'Game Step 3 | WGE 0.0.1a' });
});

module.exports = router;
