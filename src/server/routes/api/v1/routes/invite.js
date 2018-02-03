"use strict";
const express = require('express');
const router = express.Router();
const Utils = require('@utils');
const passport = require('passport');

const InviteDB = require('@DBfolder/invite');
const UserDB = require('@DBfolder/users');
const CompanyDB = require('@DBfolder/company');
const PositionDB = require('@DBfolder/position');

router.post('/:id', passport.authenticate(['access'], { session: false }), async (req, res, next) => {
    try {
        let invite = await InviteDB.get.byID(req.params.id);

        if (invite) {
            console.log(invite)
            if (req.user.id != invite.to) return Utils.sendError(res, 403, 'Forbidden');

            let company = await CompanyDB.get.byID(invite.from);
            if (company) {

                let data = {
                    company: company.id||company._id,
                    user: req.user.id,
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
    }catch (err){
        console.log(err);
        return Utils.sendError(res,500,err)
    }
});

router.delete('/:id', passport.authenticate(['access'], { session: false }), async (req, res, next) => {
    let invite = await InviteDB.get.byID(req.params.id);

    if (invite) {
        let company = await CompanyDB.get.byID(invite.from);
        if (company) {
            if (req.user.id == invite.to || company.checkAdmin(req.user.id)) {
                await InviteDB.remove.byID(invite.id);

                return res.json({
                    success: true
                });
            } else {
                return Utils.sendError(res, 403, 'Forbidden');
            }
        } else {
            return Utils.sendError(res, 404, 'Not found');
        }
    } else {
        return Utils.sendError(res, 404, 'Not found');
    }
});

module.exports = router;