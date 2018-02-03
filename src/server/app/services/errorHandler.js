const Utils = require('@utils');

module.exports = (res, err) => {
    switch (err.name) {
        case 'ValidationError':
            return Utils.sendError(res, 400, onValidationError(err));
            break;
        case 'MongoError':
            return Utils.sendError(res, 400, "Duplicate key is not allowed");
            break;
        default:
            return Utils.sendError(res, 500, "Server error");
    }
};

function onValidationError (err) {
    let msg = [];
    for (let field in err.errors) {
        msg.push(err.errors[field].message);
    }
    return msg;
}