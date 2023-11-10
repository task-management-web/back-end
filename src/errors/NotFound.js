class NotFoundException extends Error {
    constructor() {
        super();
        this.message = "Không tìm thấy tài nguyên!";
    }
}

module.exports = NotFoundException;
