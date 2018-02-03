'use strict';
const Mongoose = require('mongoose');
const config = require('@config');

let profession = Mongoose.Schema({
    profession: {
        type: String,
        primary: true
    }
});

profession.plugin(require('mongoose-paginate'));

let professionModel = Mongoose.model('Profession', profession);
module.exports = professionModel;