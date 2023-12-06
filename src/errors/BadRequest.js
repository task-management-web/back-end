const resources = require("../helpers/resources");

class BadRequest extends Error {
    constructor(errors) {
        super();
        this.message = resources.invalidInput;
        this.errors = errors;
    }
}

module.exports = BadRequest;
