class BadRequest extends Error {
    constructor(errors) {
        super();
        this.message = "Đầu vào không hợp lệ.";
        this.errors = errors;
    }
}

module.exports = BadRequest;
