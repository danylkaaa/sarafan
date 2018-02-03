"use strict";
const config = require('@config');
const DB = require('@DB');
const Auth = require('./auth/index');

exports.init = async (app) => {
    await DB.connect();
    Auth.init(app);
    console.log('+Tools: configured');
};