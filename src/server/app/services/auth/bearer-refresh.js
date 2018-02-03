"use strict";
const passport = require('passport');
const config = require('@config');
const BearerStrategy = require('passport-http-bearer').Strategy;
const Utils = require('@utils');
const DBusers = require('@DBfolder/users');

module.exports = function init () {
    passport.use('refresh', new BearerStrategy(
        async function (token, done) {
            try {
                const decode = Utils.tokens.decode('refresh', token);
                const me = await DBusers.get.byToken('refresh', decode);
                if (me) {
                    return done(null, me);
                } else {
                    return done(null, false);
                }
            } catch (err) {
                err.status = 400;
                console.log('refresh', err);
                return done(err);
            }
        }
    ));
};