var express = require('express');
var session = require("express-session");

var passport = require("./config/passport"); //here

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static("client/build"));

app.use('/', indexRouter);

module.exports = app;
