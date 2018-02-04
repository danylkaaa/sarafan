"use strict";
const express = require('express');
const router = express.Router();
const Utils = require('@utils');
const passport = require('passport');

const PositionDB = require('@DBfolder/position');
const CompanyDB = require('@DBfolder/company');
const InviteDB = require('@DBfolder/invite');
const ReviewDB = require('@DBfolder/review');

function query(args) {
    let query = {};
    if (args.city) {
        query["address.city"] = new RegExp(`^${args.city}`, 'i');
    }
    if (args.area) {
        query["address.area"] = new RegExp(`^${args.area}`, 'i');
    }
    if (args.name) {
        query["name"] = new RegExp(`^${args.name}`, 'i');
    }
    return query;
}

function pagination(args) {
    return {
        page: Number(args.page) || 1,
        limit: Number(args.limit) || 20,
        sort: args.sort || { name: 1 }
    }
}

router.get('/', async (req, res, next) => {
    try {
        let data = await CompanyDB.get.paginate(query(req.query), pagination(req.query));
        if (data) {
            let docs = data.docs;
            return res.json({
                success: true,
                page: data.page,
                limit: data.limit,
                total: data.total,
                item: docs
            });
        } else {
            return Utils.sendError(res, 404, 'Not found');
        }
    } catch (err) {
        console.log(err)
        return Utils.sendError(res, 500, err);
    }
})
router.get('/:id', async (req, res, next) => {
    try {
        let company = await CompanyDB.get.byID(req.params.id);
        if (company) {
            let { address, administration, staff, info, name, _id } = company;
            let data = {
                id: _id,
                address,
                administration,
                staff,
                name,
                info
            }

            return res.json({
                success: true,
                item: data
            });
        } else {
            return Utils.sendError(res, 404, 'Not found');
        }
    } catch (err) {
        console.log(err)
        return Utils.sendError(res, 500, err);
    }
});

router.get('/:id/rating', async (req, res, next) => {
    
});

router.get('/:id/invites', passport.authenticate(['access'], { session: false }), async (req, res, next) => {
    try {
        let company = await CompanyDB.get.byID(req.params.id);

        if (company.checkIsAdmin(req.user.id)) {
            return res.json({
                success: true,
                item: await InviteDB.get.byCompany(company.id)
            });
        } else {
            return Utils.sendError(res, 403, 'Forbidden');
        }
    } catch (err) {
        console.log(err);
        return Utils.sendError(res, 500, err);
    }
});

router.get('/:id/positions', async (req, res, next) => {
    try {
        let company = await CompanyDB.get.byID(req.params.id);

        if (company) {
            return res.json({
                success: true,
                item: await PositionDB.get.byCompany(company.id)
            });
        } else {
            return Utils.sendError(res, 404, 'Not found');
        }
    } catch (err) {
        return Utils.sendError(res, 500, err);
    }
});

router.get('/:id/reviews', async (req, res, next) => {
    try {
        let company = await CompanyDB.get.byID(req.params.id);

        if (company) {
            return res.json({
                success: true,
                item: await ReviewDB.get.byTarget(company.id)
            });
        } else {
            return Utils.sendError(res, 404, 'Not found');
        }
    } catch (err) {
        console.log(err)
        return Utils.sendError(res, 500, err);
    }
});

router.post('/create', passport.authenticate(['access'], { session: false }), async (req, res, next) => {
    try {
        //console.log(req.body)
        let { address, info, name } = req.body;
        let data = {
            address,
            info,
            name,
            administration: req.user.id
        };

        const company = await CompanyDB.create(data);
        await PositionDB.create({
            company,
            user: req.user.id,
            post: 'Власник'
        });

        return res.json({
            success: true,
            item: company
        });
    } catch (err) {
        console.log(err)
        return Utils.sendError(res, 500, err)
    }
});

router.delete('/:id', passport.authenticate(['access'], { session: false }), async (req, res, next) => {
    try {
        let company = await CompanyDB.get.byID(req.params.id);

        if (company.checkIsAdmin(req.user.id)) {
            await CompanyDB.remove.byID(req.params.id);

            return res.json({
                success: true
            });
        } else {
            return Utils.sendError(res, 403, 'Forbidden');
        }
    } catch (err) {
        console.log(err);
        return Utils.sendError(res, 500, err);
    }
});

router.put('/:id', passport.authenticate(['access'], { session: false }), async (req, res, next) => {
    try {
        let company = await CompanyDB.get.byID(req.params.id);

        if (company) {
            if (company.checkIsAdmin(req.user.id)) {

                await CompanyDB.update.byID(req.params.id, req.body);

                return res.json({
                    success: true
                });

            } else {
                return Utils.sendError(res, 403, 'Forbidden');
            }
        } else {
            return Utils.sendError(res, 404, 'Not found');
        }
    } catch (err) {
        console.log(err);
        return Utils.sendError(res, 500, err);
    }

});

router.post('/:id/invite', passport.authenticate(['access'], { session: false }), async (req, res, next) => {
    try {
        let company = await CompanyDB.get.byID(req.params.id);

        if (company) {
            if (company.checkIsAdmin(req.user.id)) {
                let invite = await InviteDB.create({
                    from: company.id,
                    to: req.body.userID,
                    role: req.body.role
                });

                return res.json({
                    success: true,
                    item: invite
                });
            } else {
                return Utils.sendError(res, 403, 'Forbidden');
            }
        } else {
            return Utils.sendError(res, 404, 'Not found');
        }
    } catch (err) {
        console.log(err)
        return Utils.sendError(res, 500, err);
    }
});

module.exports = router;