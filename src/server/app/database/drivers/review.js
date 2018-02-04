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
    byTarget(targetID) {
        return DB.methods.get.byQuery(Review, { target: targetID });
    }
};

const remove = {
    byID(id) {
        return DB.methods.remove.byID(Review, id);
    },
    byTarget(targetID) {
        return DB.methods.remove.byQuery(Review, { target: targetID });
    }
};

const update = {
    byID(id, data) {
        return DB.methods.update.byID(Review, id, data);
    }
}

module.exports = {
    create,
    get,
    remove,
    update
}