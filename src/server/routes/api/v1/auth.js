"use strict";
var express = require('express');
var router = express.Router();
const validate = require('@validator');
const Utils = require('@utils');
const DBusers = require('@DBfolder/users');
const errorHandler = require('@errorHandler');
const passport = require('passport');

function sendUser (req, res, next) {
    try {
        res.json({
            success: true,
            tokens: req.user.credentials,
            user: req.user.info()
        });
    } catch (err) {
        return errorHandler(res, err);
    }
}

async function sendToken (req, res, next) {
    return res.json(
        {
            success: true,
            tokens: {
                access: req.user.accessToken
            }
        });
}

// router.post('/register',
//     async (req, res, next) => {
//         // verify, is all data had been passed
//         const fields = ['email', 'password', 'name'];
//         fields.forEach(field => {
//             let result = validate.user[field](req.body[field]);
//             if (!result.valid) {
//                 return Utils.sendError(res, 400, result.message);
//             }
//         });
//         next();
//     },
//     async (req, res, next) => {
//         try {
//             req.user = await DBusers.create({email: req.body.email, password: req.body.password, name: req.name});
//         } catch (err) {
//             return errorHandler(res, err);
//         }
//         next();
//     },
//     sendUser);
// router.post('/login', passport.authenticate(['facebook'], {session: false}), sendUser);
router.get('/token', passport.authenticate(['refresh'], {session: false}), sendToken);
router.post('/facebook', passport.authenticate(['facebook'], {session: false}), sendUser);
module.exports = router;