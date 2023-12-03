class Conflict extends Error {
    constructor(message) {
        super();
        this.message = message;
    }
}

module.exports = Conflict;
