<<<<<<< HEAD
class Conflict extends Error {
    constructor(message) {
        super();
        this.message = message;
=======
const resources = require("../helpers/resources");

class Conflict extends Error {
    constructor(errors) {
        super();
        this.message = resources.dataConflict;
        this.errors = errors;
>>>>>>> 09091a419af5164b97e2c1c2166ddf5750d6730a
    }
}

module.exports = Conflict;
