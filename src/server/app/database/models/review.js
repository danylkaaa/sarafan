'use strict';
const Mongoose = require('mongoose');
const Utils = require('@utils');
const config = require('@config');

let Review = new Mongoose.Schema({
    target: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true
    },
    author: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    comment: {
        type: String,
        default: ''
    },
    stats: {
        quality: {
            type: Number,
            required: true,
            min: 0,
            max: 5
        },
        attitude: {
            type: Number,
            required: true,
            min: 0,
            max: 5
        },
        professionalism: {
            type: Number,
            required: true,
            min: 0,
            max: 5
        },
        sociability: {
            type: Number,
            required: true,
            min: 0,
            max: 5
        },
        speed: {
            type: Number,
            required: true,
            min: 0,
            max: 5
        }
    }
});

let reviewModel = Mongoose.model('Review', Review);
module.exports = reviewModel;