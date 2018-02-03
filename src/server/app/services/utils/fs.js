const fs = require('fs-promise');

module.exports = {
    /**
     * read file from file storage
     * @param pathToFile path to file
     * @returns {*}
     */
    read (pathToFile) {
        return fs.readFile(pathToFile, 'utf8');
    }
};