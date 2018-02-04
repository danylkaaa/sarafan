'use strict';
const Mongoose = require('mongoose');
const Utils = require('@utils');
const config = require('@config');

const ReviewDB = require('@DBfolder/review');
const PositionDB = require('@DBfolder/position');
const InviteDB = require('@DBfolder/invite');

let Company = new Mongoose.Schema({
    address: {
        area: {
            required: true,
            type: String
        },
        city: {
            required: true,
            type: String
        },
        street: {
            required: true,
            type: String
        },
        building: {
            required: true,
            type: String
        }
    },
    administration: {
        type: [Mongoose.Schema.Types.ObjectId],
        required: true,
        default: []
    },
    invites: {
        type: [Mongoose.Schema.Types.ObjectId],
        default: []
    },
    info: {
        type: String,
        default: ``
    },
    name: {
        type: String,
        required: true
    }
});

Company.plugin(require("mongoose-paginate"));

Company.pre('remove', async function (doc, next) {
    await ReviewDB.remove.byTarget(doc.id);
    await InviteDB.remove.byCompany(doc.id);
    await PositionDB.remove.byCompany(doc.id);
    next();
});

Company.methods.checkIsAdmin = function (id) {
    let admin = false;

    for(let userID of this.administration){
        if(id == userID) admin = true;
    }

    return admin;
}

let companyModel = Mongoose.model('Company', Company);
module.exports = companyModel;