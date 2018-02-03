const DB = require('@DB');
const Utils = require('@utils');
const config = require('@config');
const Position = require('../models/position');

function create(data) {
    return DB.methods.create(Position, data);
}

const get = {
    byID(id) {
        return DB.methods.get.byID(Position, id);
    },
    byQuery(data) {
        return DB.methods.get.oneByQuery(Position, data);
    },
    byUser(userID) {
        return DB.methods.get.byQuery(Position, { user: userID });
    }
}

module.exports = {
    create
};