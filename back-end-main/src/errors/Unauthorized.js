const resources = require("../helpers/resources");

class Unauthorized extends Error {
    constructor(message) {
        super();
        this.message = message || resources.unauthorized;
    }
}

module.exports = Unauthorized;
