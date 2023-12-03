const resources = require("../helpers/resources");

class NotFound extends Error {
    constructor(message) {
        super();
        this.message = message || resources.notFound;
    }
}

module.exports = NotFound;
