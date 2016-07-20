var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('lk', { title: 'Wayward Pines | WGE 0.0.1a' });
});

module.exports = router;