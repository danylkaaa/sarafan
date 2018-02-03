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
        return DB.methods.get.byQuery(Position, data);
    }
}

module.exports = {
    create
};