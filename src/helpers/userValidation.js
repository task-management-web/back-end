const resources = require("./resources");
const { isNullOrEmptyString, isValidEmail } = require("./common");

/*
 * Thêm mô tả lỗi vào đối tượng errors của response.
 */
function addError(errors, key, message) {
    if (!errors[key]) {
        errors[key] = [];
    }
    errors[key].push(message);
}

/*
 * Kiểm tra fullName:
 * - fullName không được phép trống (hoặc toàn ký tự khoảng cách)
 * - fullName không được vượt quá 100 ký tự
 */
function checkFullName(fullName, errors) {
    if (isNullOrEmptyString(fullName)) {
        addError(errors, "fullName", resources.fullNameCannotBeEmpty);
    } else if (fullName.length > 100) {
        addError(errors, "fullName", resources.fullNameExceedsAllowedLength);
    }
}

/*
 * Kiểm tra userName:
 * - userName không được phép trống (hoặc toàn ký tự khoảng cách)
 * - userName không được vượt quá 50 ký tự
 */
function checkUserName(userName, errors) {
    if (isNullOrEmptyString(userName)) {
        addError(errors, "userName", resources.userNameCannotBeEmpty);
    } else if (userName.length > 50) {
        addError(errors, "userName", resources.userNameExceedsAllowedLength);
    }
}

/*
 * Kiểm tra email:
 * - email không được phép trống (hoặc toàn ký tự khoảng cách)
 * - email không được vượt quá 100 ký tự
 * - email phải đúng định dạng
 */
function checkEmail(email, errors) {
    if (isNullOrEmptyString(email)) {
        addError(errors, "email", resources.emailCannotBeEmpty);
    } else {
        if (email.length > 100) {
            addError(errors, "email", resources.emailExceedsAllowedLength);
        }
        if (!isValidEmail(email)) {
            addError(errors, "email", resources.emailInvalidate);
        }
    }
}

/*
 * Kiểm tra password:
 * - password không được phép trống
 * - password không được vượt quá 255 ký tự
 */
function checkPassword(password, errors) {
    if (isNullOrEmptyString(password)) {
        addError(errors, "password", resources.passwordCannotBeEmpty);
    } else if (password.length > 255) {
        addError(errors, "password", resources.passwordExceedsAllowedLength);
    }
}

module.exports = {
    addError,
    checkFullName,
    checkUserName,
    checkEmail,
    checkPassword,
};
