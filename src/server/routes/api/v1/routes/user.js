"use strict";
const express = require('express');
const router = express.Router();
const Utils = require('@utils');
const passport = require('passport');

const UserDB = require('@DBfolder/users');
const CompanyDB = require('@DBfolder/company');
const PositionDB = require('@DBfolder/position');

router.get('/:id', async (req, res, next) => {
    let user = await UserDB.get.byID(req.params.id);

    if (user) {
        return res.json({
            success: true,
            item: user.info()
        });
    } else {
        return Utils.sendError(res, 404, 'Not found');
    }
});
<<<<<<< HEAD

router.get('/:id/companies', async (req, res, next) => {
    let user = await UserDB.get.byID(req.params.id);

    if (user) {
        return res.json({
            success: true,
            item: await CompanyDB.get.byAdmin(user.id)
        });
    } else {
        return Utils.sendError(res, 404, 'Not found');
    }
});

router.get('/:id/positions', async (req, res, next) => {
    let user = await UserDB.get.byID(req.params.id);

    if (user) {
        return res.json({
            success: true,
            item: await PositionDB.get.byUser(user.id)
        });
    } else {
        return Utils.sendError(res, 404, 'Not found');
    }
});

router.get('/:id/invites', async (req, res, next) => {
    
});

=======
router.delete('/:id', passport.authenticate(['access'], {session: false}), async (req, res, next) => {
    console.log(1)
    try {
        let user = await UserDB.get.byID(req.params.id);
        if (!user) {
            return Utils.sendError(res, 404, 'Not found');
        } else if (!(user._id.equals(req.user.id) || req.user.role.equals('admin'))) {
            return Utils.sendError(res, 403, "Forbidden");
        } else {
            await UserDB.remove.byID(req.params.id);
            return res.json({
                success: true
            })
        }
    } catch (err) {
        console.log(err, 1)
        return Utils.sendError(res, 500, err);
    }
});
>>>>>>> 5a1f4cccfa52f0f9805208689043d3b2dd48ea16
module.exports = router;