const DB = require('@DB');
const Utils = require('@utils');
const config = require('@config');
const Position = require('../models/position');

function create(data) {
    return DB.methods.create(Position, data);
}

module.exports = {
    create
};