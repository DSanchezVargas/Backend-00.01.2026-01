require(`dotenv`).config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const compression = require(`compression`);
const cors = require(`cors`);
const helmet = require(`helmet`);
const ratelimit = require(`express-rate-limit`);

const middlewareLogger = require(`./middlewares/logger`);
const error = require(`./middlewares/errorHandler`);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const apiRouter = require(`./routes/api`);

var app = express();

// view engine setup
console.log(__dirname);
console.log( path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(compression());
app.use(cors({
  origin: process.env.ORIGINS,
  methods:["GET","POST"]
}));
app.use(helmet());
const limiter = ratelimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);
app.use(middlewareLogger);

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(`/api`, apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(error);
module.exports = app;
