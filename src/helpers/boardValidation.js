const resources = require("./resources");
const { isNullOrEmptyString, addError } = require("./common");

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
    checkTitle,
    checkDescription,
}