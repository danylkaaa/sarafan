"use strict";
const ProfessionDB = require('@DBfolder/profession');

module.exports = {
    crypto: require('./crypto'),
    tokens: require('./tokens'),
    errors: require('./errors'),
    sendError: require('./sendError'),
    files: require('./files'),
    converter: require('./converter'),
    async fillProfessions() {
        if(ProfessionDB.size == 0) {
            let professions = require()
        }
    }
};
