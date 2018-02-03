"use strict";
const passport = require('passport');
const config = require('@config');
const BearerStrategy = require('passport-http-bearer').Strategy;
const Utils = require('@utils');
const DBusers = require('@DBfolder/users');

module.exports = function init () {
    passport.use('access', new BearerStrategy(
        async function (token, done) {
            try {
                const decode = Utils.tokens.decode('access', token);
                const me = await DBusers.get.byToken('access', decode);
                if (me) {
                    return done(null, me);
                } else {
                    return done(null, false);
                }
            } catch (err) {
                err.status = 400;
                console.log('access', err);
                return done(err);
            }
        }
    ));
};