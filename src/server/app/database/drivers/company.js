const DB = require('@DB');
const Utils = require('@utils');
const config = require('@config');
const Company = require('../models/company');

function create(data) {
    let administration = data.administration;
    data.administration = [];
    data.administration.push(administration);

    return DB.methods.create(Company, data);
};

const get = {
    byID (id) {
        return DB.methods.get.byID(Company, id);
    },
    byQuery (data) {
        return DB.methods.get.oneByQuery(Company, data);
    },
    paginate (data, pagination) {
        console.log(data,pagination)
        return DB.methods.get.byQuery(Company, data, pagination);
    },
    async byAdmin (adminID) {
        let companies = await DB.methods.get.all(Company);
        let finded = [];

        for (let company of companies) {
            for (let admin of company.administration) {
                if (adminID == admin) {
                    finded.push(company.id);
                    break;
                }
            }
        }

        return finded;
    }
};

const remove = {
    byID(id) {
        return DB.methods.remove.byID(Company, id);
    },
    async byAdmin(adminID){
        let companies = await get.byAdmin(adminID);
        let promises = companies.map(company => {
            return DB.methods.remove.byID(Company, company.id);
        });
        Promise.all(promises);
    }
};

const update = {
    byID (id, data) {
        return DB.methods.update.byID(Company, id, data);
    }
}

module.exports = {
    create,
    get,
    remove
}
