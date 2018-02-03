'use strict';
const Mongoose = require('mongoose');
const Utils = require('@utils');
const config = require('@config');

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
            type: Number
        }
    },
    administration: {
        type: [Mongoose.Schema.Types.ObjectId],
        required: true,
        default: []
    },
    staff: {
        type: [Mongoose.Schema.Types.ObjectId],
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

Company.methods.checkIsAdmin = function (id) {
    let admin = false;

    for(let userID of this.administration){
        if(id == userID) admin = true;
    }

    return admin;
}

Company.methods.addStaff = function(staffID){
    this.staff.push(staffID);
    return this.save();
}

let companyModel = Mongoose.model('Company', Company);
module.exports = companyModel;