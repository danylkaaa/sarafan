"use strict";
const express = require('express');
const router = express.Router();
const Utils = require('@utils');
const passport = require('passport');

const CompanyDB = require('@DBfolder/company');
const InviteDB = require('@DBfolder/invite');

router.get('/:id', async (req, res, next) => {
    let company = await CompanyDB.get.byID(req.params.id);

    if (company) {
        let { address, administration, staff, info } = company;

        let data = {
            address,
            administration,
            staff,
            info
        }

        return res.status(200).json(data);
    } else {
        return Utils.sendError(res, 404, 'Not found');
    }
});

router.post('/create', passport.authenticate('access'), async (req, res, next) => {
    let { address, info } = req.body;

    let data = {
        address,
        info,
        administration: req.user.id
    };

    await CompanyDB.create(data);

    return res.json({
        success: true
    });
});

router.delete('/:id', passport.authenticate('access'), async (req, res, next) => {
    let company = await CompanyDB.get.byID(req.params.id);

    if (company.checkIsAdmin(req.user.id)) {
        try {
            await CompanyDB.remove.byID(req.params.id);

            return res.json({
                success: true
            });
        } catch (error) {
            return Utils.sendError(res, 404, 'Not found');
        }
    } else {
        return Utils.sendError(res, 403, 'Forbidden');
    }
});

router.put('/:id', passport.authenticate('access'), async (req, res, next) => {
    let company = await CompanyDB.get.byID(req.params.id);

    if (company) {
        if (company.checkIsAdmin(req.user.id)) {
            try {
                await CompanyDB.update.byID(req.params.id, req.body);

                return res.json({
                    success: true
                });
            } catch (error) {
                return Utils.sendError(res, 500, 'Internal error');
            }
        } else {
            return Utils.sendError(res, 403, 'Forbidden');
        }
    } else {
        return Utils.sendError(res, 404, 'Not found');
    }

});

router.post('/:id/invite', passport.authenticate('access'), async (req, res, next) => {
    let company = await CompanyDB.get.byID(req.params.id);

    if (company) {
        if (company.checkIsAdmin(req.user.id)) {
            await InviteDB.create({
                from: company.id,
                to: req.body.userID,
                role: req.body.role
            });

            return res.json({
                success: true
            });
        } else {
            return Utils.sendError(res, 403, 'Forbidden');
        }
    } else {
        return Utils.sendError(res, 404, 'Not found');
    }
});

module.exports = router;