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
 * Kiểm tra định dạng họ tên.
 */
function checkFullName(fullName, errors) {
    // Họ tên không được phép trống (hoặc chỉ gồm các ký tự khoảng cách)
    if (isNullOrEmptyString(fullName)) {
        addError(errors, "fullName", resources.fullNameCannotBeEmpty);
    }
    // Họ tên không vượt quá 100 ký tự
    else if (fullName.length > 100) {
        addError(errors, "fullName", resources.fullNameExceedsAllowedLength);
    }
}

/*
 * Kiểm tra định dạng tên người dùng.
 */
function checkUserName(userName, errors) {
    // Tên người dùng không được phép trống (hoặc chỉ gồm các ký tự khoảng cách)
    if (isNullOrEmptyString(userName)) {
        addError(errors, "userName", resources.userNameCannotBeEmpty);
    } else {
        // Tên người dùng không vượt quá 50 ký tự
        if (userName.length > 50) {
            addError(
                errors,
                "userName",
                resources.userNameExceedsAllowedLength
            );
        }
        // Tên người dùng chỉ chứa các ký tự chữ cái và chữ số
        const regex = /^[a-zA-Z0-9]+$/;
        if (!regex.test(userName)) {
            addError(errors, "userName", resources.userNameDoesNotContainSpecialCharacters);
        };
    }
}

/*
 * Kiểm tra định dạng email.
 */
function checkEmail(email, errors) {
    // Email không được phép trống (hoặc chỉ gồm các ký tự khoảng cách)
    if (isNullOrEmptyString(email)) {
        addError(errors, "email", resources.emailCannotBeEmpty);
    } else {
        // Email không vượt quá 100 ký tự
        if (email.length > 100) {
            addError(errors, "email", resources.emailExceedsAllowedLength);
        }
        // Email đúng định dạng
        if (!isValidEmail(email)) {
            addError(errors, "email", resources.emailInvalidate);
        }
    }
}

/*
 * Kiểm tra định dạng mật khẩu.
 */
function checkPassword(password, errors) {
    // Mật khẩu không được phép trống (hoặc chỉ gồm các ký tự khoảng cách)
    if (isNullOrEmptyString(password)) {
        addError(errors, "password", resources.passwordCannotBeEmpty);
    } else {
        // Mật khẩu không vượt quá 255 ký tự
        if (password.length > 255) {
            addError(errors, "password", resources.passwordExceedsAllowedLength);
        }
        // Mật khẩu không ít hơn 8 ký tự
        if (password.length < 8) {
            addError(errors, "password", resources.passwordIsTooShort);
        }
    }
}

module.exports = {
    addError,
    checkFullName,
    checkUserName,
    checkEmail,
    checkPassword,
};
