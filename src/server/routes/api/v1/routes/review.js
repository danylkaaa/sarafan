"use strict";
const express = require('express');
const router = express.Router();
const Utils = require('@utils');
const passport = require('passport');

const ReviewDB = require('@DBfolder/review');

router.post('/', passport.authenticate('access', {session: false}), async (req, res, next) => {
    let query = {
        author: req.user.id,
        target: req.body.target
    };

    let data = {
        author: req.user.id,
        ...req.body
    };

    try {
        let review = await ReviewDB.get.byQuery(query);
        if (review) {
            console.log((Date.now() - review.modified ))
            if ((Date.now() - review.modified)/1000 < 30/*30 sec*/ ) return Utils.sendError(res, 400, 'Спробуйте пізніше');
            await ReviewDB.update.byID(review.id, data);
            return res.json({
                success: true
            });
        } else {
            review = await ReviewDB.create(data);
            return res.json({
                success: true,
                item: review
            });
        }
    } catch (error) {
        console.log(error)
        return Utils.sendError(res, 500, 'Internal error');
    }
    ;
});

router.put('/:id', passport.authenticate('access', {session: false}), async (req, res, next) => {
    let data = {
        author: req.user.id,
        ...req.body
    };

    try {
        let review = await ReviewDB.get.byID(req.params.id);

        if (!review) return Utils.sendError(res, 404, 'Not found');
        if (review.author != data.author) return Utils.sendError(res, 403, 'Forbidden');
        if (Date.now() - review.modified > 1000 * 60 * 60 * 24 * 7) return Utils.sendError(res, 400, 'Спробуйте пізніше');

        await ReviewDB.update.byID(id, data);

        return res.json({
            success: true
        });
    } catch (error) {
        return Utils.sendError(res, 500, 'Internal error');
    }
    ;
});

router.get('/:id', async (req, res, next) => {
    try {
        let review = await ReviewDB.get.byID(req.params.id);

        if (review) {
            return res.json({
                success: true,
                item: review
            })
        } else {
            return Utils.sendError(res, 404, 'Not found');
        }
    } catch (error) {
        return Utils.sendError(res, 500, 'Internal error');
    }
});

module.exports = router;