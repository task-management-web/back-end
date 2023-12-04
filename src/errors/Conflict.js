const resources = require("../helpers/resources");

class Conflict extends Error {
    constructor(errors) {
        super();
        this.message = resources.dataConflict;
        this.errors = errors;
    }
}

module.exports = Conflict;
