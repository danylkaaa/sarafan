const DB = require('@DB');
const Profession = require('../models/profession');

let query = { profession: new RegExp(`^${str}`, i) };

async function size() {
    return (await DB.methods.get.all(Profession)).lenght;
}

function create(profession) {
    return DB.methods.create(Profession, { profession });
}

module.exports = {
    async fillProfessions() {
        if (await size() == 0) {
            let professions = require('../../../public/files/professions.json');

            for (let profession of professions) {
                await ProfessionDB.create({ profession });
                console.log('created prof');
            }
        }
    },
    find(str) {
        return DB.methods.get.byQuery(Profession, query);
    }
}