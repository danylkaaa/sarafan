const DB = require('@DB');
const Utils = require('@utils');
const config = require('@config');
const User = require('../models/user');

async function create (data) {
    return DB.methods.create(User, data);
}

const get = {
    oauth: {
        byFacebookID (id) {
            return DB.methods.get.oneByQuery(User, {facebook: {id: id}});
        }
    },
    async byToken (name, token) {
        const user = await DB.methods.get.byID(User, token.id);
        return user;
    },
    async byCredentials (email, password) {
        let user = await DB.methods.get.oneByQuery(User, {email: email});
        if (user && await user.comparePasswords(password)) {
            return user;
        } else {
            return null;
        }
    },
    async byEmail (email) {
        return DB.methods.get.oneByQuery(User, {email: email});
    }
};
const remove = {
    byID (id) {
        return DB.methods.remove.byID(User, id)
    },
    byEmail (email) {
        return DB.methods.remove.byQuery(User, {email: email})
    }
};

const oauth = {
    async facebook (profile, access, refresh) {
        console.log(1);
        // find user by id
        let user;
        user = await get.oauth.byFacebookID(profile.id);
        console.log(1);
        if (user) {
            return user;
        }
        console.log(2);
        if (profile.email) {
            user = await get.byEmail(profile.email);
            if (user) {
                user.facebook = {
                    id: profile.id,
                    name: `${profile.last_name} ${profile.first_name}`
                };
                await user.save();
                return user;
            }
        }
        console.log(3);
        return create({
            isUsedBasicAuth: false,
            email: profile.email,
            facebook: {
                id: profile.id,
                name: `${profile.last_name} ${profile.first_name}`
            }
        })
    }
};
module.exports = {
    create,
    remove,
    get,
    oauth
};