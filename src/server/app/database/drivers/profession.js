const DB = require('@DB');
const Profession = require('../models/profession');

module.exports = {
    create(profession) {
        return DB.methods.create(Profession, { profession });
    },
    async size() {
        return (await DB.methods.get.all(Profession)).lenght;
    }
}