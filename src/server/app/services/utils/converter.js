const ObjectID = require('mongoose').Types.ObjectId;
module.exports = {
    str2id (str) {
        if (typeof str != 'string') str;
        try {
            return new ObjectID.createFromHexString(str);
        } catch (e) {
            return undefined;
        }
    },
};