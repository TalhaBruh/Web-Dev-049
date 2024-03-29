var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var dotenv = require('dotenv').config()
var logger = require('morgan');
// Mongoose and schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Load the Movie model
var Movie = require('./models/movie');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var moviesRouter = require('./routes/movies');

var app = express();

console.log("starting")

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
	res.render("home.ejs")
})

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);

app.get('/sign',(req,res)=>{
	res.render("sign.ejs");
})

app.get('/trailers',(req,res)=>{
	res.render("trailers.ejs");
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;