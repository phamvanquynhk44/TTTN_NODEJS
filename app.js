var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
/* var session = require('express-session');
var flush=require('connect-flash'); */
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var collectionsRouter = require('./routes/collections');

var app = express();
app.use(session({
  secret: 'sdfdsf',
  resave: false,
  saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next){
/*   
  res.locals.user = req.session.user; */
  res.locals.idAuthority = req.session.idAuthority;
  res.locals.surname = req.session.surname;
  res.locals.name = req.session.name;
  res.locals.email = req.session.email;
  res.locals.phone = req.session.phone;
  res.locals.role = req.session.role;
  res.locals.address = req.session.address;
  
  res.locals.id = req.session.id;
  //product
  res.locals.id= req.session.id;
  res.locals.product_name = req.session.product_name;
  res.locals.image= req.session.image;
  res.locals.price= req.session.price;
  res.locals.alias= req.session.alias;
  res.locals.quantity= req.session.quantity;
  //session
  
  res.locals.cart = req.session.cart;
  res.locals.amount = req.session.amount;
  res.locals.numberOfItem = req.session.numberOfItem;
//  res.locals.users=id = req.session.users=id;
  next();
});
/* app.use(flush()); */


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/collections', collectionsRouter);

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
