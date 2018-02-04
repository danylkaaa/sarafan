"use strict";
const config = require('@config');
const DB = require('@DB');
const Auth = require('./auth/index');
const ProfessionDB =require('@DBfolder/profession');

exports.init = async (app) => {
    await DB.connect();
    await ProfessionDB.fillProfessions();
    Auth.init(app);
    console.log('+Tools: configured');
};