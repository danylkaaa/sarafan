const DB = require('@DB');
const Utils = require('@utils');
const config = require('@config');
const Company = require('../models/company');

function create(data) {
    let administration = data.administration;
    data.administration = [];
    data.administration.push(administration);

    return DB.methods.create(Company, data);
};

const get = {
    byID (id) {
        return DB.methods.get.byID(Company, id);
    },
    byQuery (data) {
        return DB.methods.get.oneByQuery(Company, data);
    }
};

const remove = {
    byID (id) {
        return DB.methods.remove.byID(Company, id);
    }
};

module.exports = {
    create,
    get,
    remove
}
