'use strict';
const Mongoose = require('mongoose');
const Utils = require('@utils');
const config = require('@config');

const ReviewDB = require('@DBfolder/review');

let Position = new Mongoose.Schema({
    company: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true
    },
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true
    },
    post: {
        type: String,
        required: true
    }
});

Position.pre('remove', async function (doc, next) {
    await ReviewDB.remove.byTarget(doc.id);
    next();
});

Position.methods.calculateRating = async function () {
    try {
        let reviews = await ReviewDB.get.byTarget(this.id);
        let stats = {
            quality: 0,
            attitude: 0,
            professionalism: 0,
            sociability: 0,
            speed: 0
        }

        for (let review of reviews) {
            for (let key in stats) {
                stats[key] += review.stats[key];
            }
        }

        for (let key in stats) {
            stats[key] = Utils.calculateRating(stats[key], reviews.length);
        }

        return stats;
    } catch(error) {
        throw error;
    }
}

let positionModel = Mongoose.model('Position', Position);
module.exports = positionModel;