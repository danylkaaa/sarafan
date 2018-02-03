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
            return DB.methods.get.oneByQuery(User, {"facebook.id": id});
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
    async byID (id) {
        return DB.methods.get.byID(User, id);
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
        console.log(3);
        return create({
            email: profile.email,
            name: `${profile.last_name} ${profile.first_name}`,
            picture: `https://graph.facebook.com/v2.12/${profile.id}/picture?access_token&width=400`,
            facebook: {
                access:access,
                refresh:refresh,
                link: profile.link,
                id: profile.id,
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