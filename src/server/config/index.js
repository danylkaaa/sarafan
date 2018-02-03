"use strict";
const path = require('path');

function generateDB () {
    let suff = process.env.NODE_ENV == 'dev' ? "DEV" : "PROD";
    let address = process.env[`DB_${suff}_ADDRESS`];
    return address
        .replace(`<dbuser>`, process.env[`DB_${suff}_USER`])
        .replace(`<dbpassword>`, process.env[`DB_${suff}_PSW`]);
}

module.exports = {
    IS_DEV: process.env.NODE_ENV == 'dev',
    ROOT_URL: this.IS_DEV ? `localhost:${this.PORT}` : `https://conrol-my-budget.herokuapp.com`,
    DB_URL: generateDB(),
    PORT: process.env.PORT || 3000,
    security: {
        SERVER_SALT: "123jfYamjk802ocm",
        tokenLife: {
            ACCESS: 60 * 60*10, //10 hour
            REFRESH: 60 * 60 * 24 * 10 //10 days
        },
        secrets: {
            ACCESS: process.env.ACCESS_SECRET,
            REFRESH: process.env.REFRESH_SECRET,
        }
    },
    auth: {
        Facebook: {
            ID: process.env.FACEBOOK_ID,
            SECRET: process.env.FACEBOOK_SECRET
        }
    }
};