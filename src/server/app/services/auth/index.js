"use strict";
const facebook = require('./facebook');
const refresh = require('./bearer-refresh');
const access = require('./bearer-access');
const basic = require('./basic');
const passport = require('passport');

module.exports.init = (app) => {
    facebook();
    access();
    refresh();
    basic();
    app.use(passport.initialize());
    console.log('+Auth: configured');
};