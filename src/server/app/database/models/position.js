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

let positionModel = Mongoose.model('Position', Position);
module.exports = positionModel;