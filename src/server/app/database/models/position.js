'use strict';
const Mongoose = require('mongoose');
const Utils = require('@utils');
const config = require('@config');

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

let positionModel = Mongoose.model('Position', Position);
module.exports = positionModel;