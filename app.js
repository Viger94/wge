var express = require('express');
var expressSession = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var bootable       = require('bootable');
var bootableEnv    = require('bootable-environment');

var routes = require('./routes/index');
var users = require('./routes/users');
var lk = require('./routes/lk');
var game = require('./routes/game');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({ secret: 'ssadfvafvqerg2154t1tgwrtegqwr5g2543rg2rgbb2' }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/lk', lk);
app.use('/ver', routes);
app.use('/game', game);
app.use('/game/step1', game);
app.use('/game/step2', game);
app.use('/game/step3', game);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

//Passport
var passport       = require('passport');
var LocalStrategy  = require('passport-local').Strategy;

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(username, password,done){
  User.findOne({ username : username},function(err,user){
    return err 
      ? done(err)
      : user
        ? password === user.password
          ? done(null, user)
          : done(null, false, { message: 'Incorrect password.' })
        : done(null, false, { message: 'Incorrect username.' });
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});


passport.deserializeUser(function(id, done) {
  User.findById(id, function(err,user){
    err 
      ? done(err)
      : done(null,user);
  });
});

var requireTree              = require('require-tree');
var controllers              = requireTree('./controllers');

var mustAuthenticatedMw      = require('./middlewares/must-authenticated'); 
// Auth system
app.post('/login',                  controllers.users.login);
app.post('/register',               controllers.users.register);
app.get('/logout',                  controllers.users.logout);
app.all('game', mustAuthenticatedMw);
app.all('game/*', mustAuthenticatedMw);