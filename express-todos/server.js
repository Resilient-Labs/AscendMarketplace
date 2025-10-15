var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var todosRouter = require('./routes/todos');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// mount middleware into the middleware pipeline
// app.use([starts with path], <middleware fn> [, <middleware function>])

app.use(function(req, res, next) {
console.log('Hello SEI!');
// add a time property to the res.locals object
// the time property will then be accessible within templated
res.locals.time = new Date().toLocaleTimeString()
next();
});

// log in the terminal the HTTP request info
app.use(logger('dev'));
// data sent in the body of the requests, if it's json
app.use(express.json());
//processes data sent in ' form ' body of the requests
// It will create a property on req.body for each <input>, <select>, and/or <textarea>
// in a form
app.use(express.urlencoded({ extended: false }));
// Add a cookies property for each cookie sent in the request
app.use(cookieParser());
// if the request is for a static asset, return the file
app.use(express.static(path.join(__dirname, 'public')));

// the first arg is the starts with path
// the paths within the route modules are appended
// to the starts with paths
app.use('/', indexRouter);
app.use('/todos', todosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
