let rules = {
    password ($data) {
        return {
            valid: ($data) => $data.match(/^[\w.-]{4,}$/i),
            message: "Password must contain more than 4 symbol, and can contain only letters and numbers",
        }
    },
    email ($data) {
        return {
            valid: ($data) => $data.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i),
            message: `'${$data}' is not valid email`,
        }
    },
    name($data){
        return {
            valid:true
        }
    }
};
module.exports = rules;
