"use strict";
const passport = require('passport');
const config = require('@config');
const Utils = require('@utils');
const DBusers = require('@DBfolder/users');
const BasicStrategy = require('passport-http').BasicStrategy;

module.exports = function init () {
    passport.use('basic', new BasicStrategy(
        async

    function (username, password, done) {
        try {
            const user = await
            DBusers.get.byCredentials(username, password);
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        } catch (err) {
            err.status = 400;
            console.log('basic auth: ', err);
            return done(err);
        }
    }

))
};