const resources = require("../helpers/resources");
const BadRequest = require("../errors/BadRequest");
const Conflict = require("../errors/Conflict");
const InternalServerError = require("../errors/InternalServerError");
const NotFound = require("../errors/NotFound");

const errorHandler = (err, req, res, next) => {
    if (err instanceof BadRequest) {
        res.status(400).json(err);
    } else if (err instanceof NotFound) {
        res.status(404).json(err);
    } else if (err instanceof Conflict) {
        res.status(409).json(err);
    } else {
        res.status(500).json(
            new InternalServerError(resources.internalServerError, err)
        );
    }
};

module.exports = errorHandler;