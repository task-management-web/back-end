const resources = require("../helpers/resources");

class Unauthorized extends Error {
    constructor() {
        super();
        this.message = resources.unauthorized;
    }
}

module.exports = Unauthorized;