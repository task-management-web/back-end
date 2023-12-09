const resources = require("./resources");
const { isNullOrEmptyString, addError } = require("./common");

/*
 * Kiểm tra định dạng dữ liệu bảng.
 */
function checkBoard(board) {
    const { title, description, backgroundUrl } = board;
    let errors = {};

    checkTitle(title, errors);
    checkDescription(description, errors);

    if (Object.keys(errors).length !== 0) {
        throw new BadRequest(errors);
    }
}

/*
 * Kiểm tra định dạng tên bảng.
 */
function checkTitle(title, errors) {
    // Tên bảng không được để trống (hoặc chỉ gồm các ký tự khoảng cách)
    if (isNullOrEmptyString(title)) {
        addError(errors, "title", resources.boardTitleCannotBeEmpty);
    }
    // Tên bảng không vượt quá 255 ký tự
    else if (title.length > 255) {
        addError(errors, "title", resources.boardTitleExceedsAllowedLength);
    }
}

/*
 * Kiểm tra định dạng mô tả bảng.
 */
function checkDescription(description, errors) {
    if (description && description.length > 65535) {
        addError(errors, "description", resources.boardDescriptionExceedsAllowedLength);
    }
}

module.exports = {
    checkBoard,
}