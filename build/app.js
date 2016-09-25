'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var search = require("./routes/search");
var error = require("./routes/error");
var summoner = require("./routes/summoner");
var suggestions = require("./routes/suggestions");
var suggestionsPost = require("./routes/suggestionsPost");
var loading = require("./routes/loading");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("jsx", require("express-react-views").createEngine());
app.set('view engine', 'jsx');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express['static'](path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, "/public/favicon.ico")));

app.use('/', routes);
app.use("/search", search);
app.use('/users', users);
app.use("/error", error);
app.use("/summoner", summoner);
app.use("/summoner", suggestions);
app.use("/summoner", suggestionsPost);
app.use("/summoner", loading);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    console.error(err);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: JSON.stringify(err.message),
    error: {}
  });
});

module.exports = app;
//# sourceMappingURL=app.js.map