'use strict';
const Mongoose = require('mongoose');
const Utils = require('@utils');
const config = require('@config');

let Invite = new Mongoose.Schema({
    from: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    hash: {
        type: String,
        required: true
    },
    info: {
        type: String,
        default: ''
    }
});

let inviteModel = Mongoose.model('Invite', Invite);
module.exports = inviteModel;