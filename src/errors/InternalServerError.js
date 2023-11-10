class InternalServerError extends Error {
    constructor(message, err) {
        super();
        this.message = message;
        this.errors = err;
    }
}

module.exports = InternalServerError;
