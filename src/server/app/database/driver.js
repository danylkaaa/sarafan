const config = require('@config');
const mongoose = require('mongoose');
const Utils = require('@utils');

function connect () {
    const database = mongoose.connection;
    mongoose.Promise = Promise;
    mongoose.connect(config.DB_URL, {
        useMongoClient: true,
        promiseLibrary: global.Promise
    });
    console.log(config.DB_URL, config.IS_DEV);
    process.on('SIGINT', () => {
        database.close(() => {
            console.log('+DB: connection closed');
            process.exit(0);
        })
    });
    database.on('disconnected', () => console.log('-DB: disconnected'));
    return new Promise((resolve, reject) => {
        database.on('error', error => {
            console.log(`-DB: connection failed: ${error}`);
            reject();
        });
        database.on('connected', () => {
            console.log(`+DB: connected` + (config.IS_DEV ? ` to ${config.DB_URL}` : ""));
            resolve();
        });

    })

}

const methods = {
    /**
     *
     * @param model model of new entity
     * @param data data of new doc
     * @return {Promise<any>} id of created entity
     */
    create (model, data) {
        let entity = new model(data);
        return new Promise((resolve, reject) => {
            entity.save((err, id) => {
                if (err) {
                    reject(err);
                }
                else resolve(id);
            });
        });
    },
    remove: {
        byID (model, id) {
            return model.findByIdAndRemove(id).exec();
        },
        byQuery (model, query) {
            return model.remove(query).exec();
        }
    },
    get: {
        all (model) {
            return model.find().exec();
        },
        byID (model, id) {
            return model.findById(id).exec();
        },
        /**
         * find one doc by query
         * @param model model to search
         * @param query query to search
         * @return {Promise} result of search
         */
        oneByQuery (model, query) {
            return model.findOne(query).exec();
        },
        /**
         *
         * @param model model to use
         * @param query query to search
         * @param pagination pagination options (page, limit, sort)
         * @return {*} paginated or not paginated list of entities
         */
        byQuery (model, query, pagination) {
            if (!pagination) {
                return model.find(query).exec();
            } else {
                return model.paginate(query, pagination);
            }
        }

    },
    update: {
        byID (model, id, data) {
            return model.findByIdAndUpdate(id, data).exec();
        }
    }
};

module.exports = {
    connect,
    methods,
};