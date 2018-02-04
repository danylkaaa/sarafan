"use strict";
const passport = require('passport');
const config = require('@config');
const DBusers = require('@DBfolder/users');
var FacebookTokenStrategy = require('passport-facebook-token');

module.exports = function init () {
    passport.use('facebook', new FacebookTokenStrategy({
            clientID: config.auth.Facebook.ID,
            clientSecret: config.auth.Facebook.SECRET,
            profileFields: ['id', 'email', 'name', 'link','picture']
        },
        async function (accessToken, refreshToken, data, done) {
            console.log(data)
            // console.log(JSON.stringify(data._json, null, 2));
            try {
                let profile = data["_json"];
                const me = await DBusers.oauth.facebook(profile, accessToken, refreshToken);
                if (me) {
                    return done(null, me);
                } else {
                    return done(null, false);
                }

            } catch (err) {
                err.status = 400;
                console.log('facebook', err);
                return done(err);
            }
        }
    ));
};