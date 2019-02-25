var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var connectMultiparty = require('connect-multiparty');
var util = require("util");
var mongokeeper = require('./public/js/mongokeeper');
var config=require('./config.global');

var front = require('./routes/front');
var product = require('./routes/product');
var users = require('./routes/users');
var admin = require('./routes/admin');

var app = express();

var dbUrl = util.format('mongodb://%s:%s@%s:%d/%s', config.dbConfig.userid, config.dbConfig.password, config.dbConfig.host, config.dbConfig.port, config.dbConfig.database);


process.env.NODE_ENV='development';
// process.env.NODE_ENV='production';

/*if (process.env.NODE_ENV=='production') {
  process.env.PORT = config.port
}*/

if (process.env.NODE_ENV=='development') { 
    process.env.MONGO_DB_STR = config.dev_dbUrl;
}

mongokeeper.config(config.dbConfig);

// view engine setup
app.set('views', path.join(__dirname, 'app/views/pages'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(connectMultiparty());
app.use(session({
    secret: 'kafulai',
    store: new mongoStore({
        // url: dbUrl,
        url: config.dev_dbUrl,
        collection: 'sessions'
    }),
    cookie: {},
    resave: false,
    saveUninitialized: true
}))

app.use(function(req, res, next){
  var _user = req.session.user;
  
  app.locals.user = _user;

  next();
})
app.use('/', front);
app.use('/shop', product);
app.use('/users', users);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.locals.moment = require('moment');

module.exports = app;
