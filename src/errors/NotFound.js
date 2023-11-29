const resources = require("../helpers/resources");

class NotFound extends Error {
    constructor() {
        super();
        this.message = resources.notFound;
    }
}

module.exports = NotFound;
