// config
require('dotenv').config();
require('module-alias/register');
require('@config');

// tools
const services = require('@services');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const busboyBodyParser = require('busboy-body-parser');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// use middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(busboyBodyParser());
app.use(cookieParser());
// enable cors
var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));


services.init(app);
app.use(require('@routes/index'));


console.log(`+Up on ${process.env.PORT}`);
module.exports = app;
