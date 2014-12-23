var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session  = require('express-session');
var index = require('./routes/index');
var user = require('./routes/user');
var form = require('./routes/form');
var upload = require('./routes/upload');
var recipe = require('./routes/recipe');
var flash = require('connect-flash');
var multer = require('multer');
var db = require('cookupsdb');
var done=false;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.engine('html', require('ejs').renderFile);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.bodyParser({uploadDir:'/'}));

app.use(session({secret: 'octocat', saveUninitialized: true, resave: true}));
app.use(multer({ dest: './public/uploads' }));
app.use(flash());

app.use('/', index);
app.use('/user', user);
app.use('/recipe', recipe);
app.use('/form', form);
app.use('/ul', upload);

app.get('/about', function(req, res){
  res.redirect('/about');	
});

app.get('/contact', function(req, res){
  res.redirect('/contact');
});

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