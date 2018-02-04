const DB = require('@DB');
const Profession = require('../models/profession');

async function size() {
    return (await Profession.paginate({},{limit:0})).total;
}

function create(profession) {
    return DB.methods.create(Profession,  profession);
}

module.exports = {
    async fillProfessions() {
        if (await size() == 0) {
            let professions = require('../../../public/files/professions.json');

            let i=0;
            let x=[];
            for (let profession of professions) {
                x.push(create({ profession }));
                console.log(i++)
            }
            return Promise.all(x)
        }
    }
}