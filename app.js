var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var  a=require('./routes/a');
var install=require('./routes/install');
var login=require('./routes/login');
var admins=require('./routes/admins');
var test=require('./routes/test');
//自动运行全自动偷小说功能
/*var novelAuto=require('./lib/novelAuto');
novelAuto.getAllNovel();*/
var index = require('./routes/index');//引入外部js文件
//var users = require('./routes/users');
var viewnovel=require('./routes/viewnovel');
var viewsection=require('./routes/viewsection');
var app = express();
//app版模块
var appIndex=require('./routes/appIndex');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app路由
app.use('/app/',appIndex);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/install',install);
app.use('/login',login);
app.use('/ajax/admins',admins);
app.use('/test',test);
app.use('/viewnovel',viewnovel);
app.use('/viewsection',viewsection);

//app.use(/^\/[0-9]+$/,a);
//app.use('/users', users);

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

module.exports = app;
