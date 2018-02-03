const fileType = require("file-type");

module.exports = {
    ext: {
        images: ["png", "jpg", "jpeg"]
    },
    /**
     * return extention of file
     * @param {file} to process
     * @returns {String} extention of file
     */
    extOf (data) {
        return fileType(data).ext
    },
    /**
     * check is file is image by magic number
     * @param file file to check
     * @returns {boolean}
     */
    isImage (file) {
        try {
            return this.ext.images.indexOf(this.extOf(file.data)) !== -1;
        } catch (e) {
            return false;
        }
    }
};