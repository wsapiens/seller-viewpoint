var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var memcachedStore = require('connect-memcached')(session);
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var flash    = require('connect-flash');
var ipfilter = require('express-ipfilter').IpFilter;
const LocalStrategy = require('passport-local').Strategy;
const log = require('./log');
const models = require('./models');
const config = require('./config');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');

var app = express();

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.session
        && req.session.passport
        && req.session.passport.user) {
        return next();
    }
    // if they aren't redirect them to the home page
    res.redirect('/login');
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// trust first proxy
app.set('trust proxy', 1);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  express.static(path.join(__dirname, 'node_modules')),
  express.static(path.join(__dirname, 'public'))
);
app.use(session({
  secret: config.get('app.sessionSecret'),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // change this to true when run as https
  store: new memcachedStore({
    hosts: [ config.get('app.memcachedHost') ],
    secret: config.get('app.memcachedSecret'), // Optionally use transparent encryption for memcache session data
  })
}));
// uploads static should be after setting session
app.use('/uploads', isLoggedIn, express.static(path.join(__dirname, 'uploads')));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  models.Users
        .findById(id)
        .then(user => {
          cb(null, user);
        });
});


passport.use(new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, username, password, done) {
    models.sequelize
          .query('SELECT id, organization_id, email, firstname, phone, is_admin FROM users WHERE email=$1 AND password = crypt($2, password)',
          {
            bind: [
              username,
              password
            ],
            type: models.sequelize.QueryTypes.SELECT
          })
          .then(users => {
            if(users.length > 0) {
              return done(null, users[0]);
            } else {
              return done(null, false, req.flash('errorMessage', 'Login Failure'));
            }
          });
  }
));


// IP list to block or allow
var ips = [];
app.use(ipfilter(ips));
// app.use(ipfilter(ips, {mode: 'allow'}));

app.use('/', indexRouter);
app.use('/users', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  log.error(err.message);
  log.error(err.stack);

  // render the error page
  res.status(err.status || 500);
  res.render('error', { message: err.message });
});

module.exports = app;
