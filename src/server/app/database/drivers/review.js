const DB = require('@DB');
const Utils = require('@utils');
const config = require('@config');
const Review = require('../models/review');

function create(data) {
    return DB.methods.create(Review, data);
}

const get = {
    byID(id) {
        return DB.methods.get.byID(Review, id);
    },
    byQuery(data) {
        return DB.methods.get.oneByQuery(Review, data);
    }
};

const remove = {
    byID(id) {
        return DB.methods.remove.byID(Review, id);
    }
};

module.exports = {
    create,
    get,
    remove
}