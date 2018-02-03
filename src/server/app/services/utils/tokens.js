const jwt = require('jsonwebtoken');
const config = require('@config');

module.exports = {
    algorithm: 'HS256',
    secret (name) {
        switch (name) {
            case 'ACCESS':
            case 'REFRESH':
                return config.security.secrets[name];
            default:
                throw new Error(`Invalid token name: '${name}`);
        }
    },
    /**
     * generate new token, with specified name and data
     * @param name on of 'access' or 'refresh'
     * @param data data to store in token
     * @returns {String} string created token
     */
    generate (name, data) {
        name = name.toUpperCase();
        return jwt.sign(
            data,
            this.secret(name),
            {
                algorithm: this.algorithm,
                expiresIn: config.security.tokenLife[name]
            }
        )
    },
    /**
     * decode token
     * @param name one of 'access', 'refresh'
     * @param token string with token
     * @returns {{}} decoded token
     */
    decode (name, token) {
        name = name.toUpperCase();
        return jwt.verify(
            token,
            this.secret(name),
            {
                algorithms: [this.algorithm]
            }
        )
    }
};