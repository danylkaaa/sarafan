const DB = require('@DB');
const Utils = require('@utils');
const config = require('@config');
const Invite = require('../models/invite');
const jwt = require('jsonwebtoken');

async function create(data) {
    try {
        await Invite.create(data);

        let invite = await Intive.get.byQuery(data);

        let hash = jwt.sign({
            inviteID: invite.id,
        }, process.env.JWT_TOKEN);

        //TODO send inviting
    } catch (error) {
        throw error;
    }
}

const get = {
    byID(id) {
        return DB.methods.get.byID(Invite, id);
    },
    byQuery(data) {
        return DB.methods.get.oneByQuery(Invite, data);
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