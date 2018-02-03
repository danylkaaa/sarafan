"use strict";
const express = require('express');
const router = express.Router();
const Utils = require('@utils');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const InviteDB = require('@DBfolder/invite');
const UserDB = require('@DBfolder/users');
const CompanyDB = require('@DBfolder/company');
const PositionDB = require('@DBfolder/position');

router.post('/:token', passport.authenticate('access'), async (req, res, next) => {
    try {
        let decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);

        let { inviteID } = decoded;
        let invite = await InviteDB.get.byID(inviteID);

        if (invite) {
            if (req.user.id != invite.to) return Utils.sendError(res, 403, 'Forbidden');

            let user = UserDB.get.byID(invite.to);
            let company = CompanyDB.get.byID(invite.from);

            if (user && company) {

                let data = {
                    company: company.id,
                    user: user.id,
                    post: invite.role
                };

                let position = await PositionDB.create(data);
                await company.addStaff(position.id);
                await InviteDB.remove.byID(invite.id);

                return res.json({
                    success: true
                });
            } else {
                return Utils.sendError(res, 404, 'Not found');
            }
        } else {
            return Utils.sendError(res, 404, 'Not found');
        }

    } catch (error) {
        return Utils.sendError(res, 403, 'Forbidden');
    };
});

router.post('/:token', passport.authenticate('access'), async (req, res, next) => {
    try {
        let decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);

        let { inviteID } = decoded;
        let invite = await InviteDB.get.byID(inviteID);

        if (invite) {
            if (req.user.id != invite.to) return Utils.sendError(res, 403, 'Forbidden');

            await InviteDB.remove.byID(invite.id);

            return res.json({
                success: true
            });
        } else {
            return Utils.sendError(res, 404, 'Not found');
        }

    } catch (error) {
        return Utils.sendError(res, 403, 'Forbidden');
    };
});



module.exports = router;