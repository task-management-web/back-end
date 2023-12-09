const resources = require("../helpers/resources");

class Forbidden extends Error {
    constructor(message) {
        super();
        this.message = message || resources.forbidden;
    }
}

module.exports = Forbidden;