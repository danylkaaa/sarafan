const DB = require('@DB');
const Utils = require('@utils');
const config = require('@config');
const Invite = require('../models/invite');

async function create(data) {
    return DB.methods.create(Invite, data);
}

const get = {
    byID(id) {
        return DB.methods.get.byID(Invite, id);
    },
    byQuery(data) {
        return DB.methods.get.oneByQuery(Invite, data);
    },
    byUser(userID) {
        return DB.methods.get.byQuery(Invite, { to: userID });
    },
    byCompany(companyID) {
        return DB.methods.get.byQuery(Invite, { from: companyID });
    }
};

const remove = {
    byID(id) {
        return DB.methods.remove.byID(Invite, id);
    }
};

module.exports = {
    create,
    get,
    remove
}