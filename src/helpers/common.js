/*
 * Kiểm tra một chuỗi có rỗng hay không.
 */
function isNullOrEmptyString(string) {
    return string === null || string === undefined || string.trim() === "";
}

/*
 * Kiểm tra một chuỗi có phải email hay không.
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/*
 * Thêm mô tả lỗi vào đối tượng errors của response.
 */
function addError(errors, key, message) {
    if (!errors[key]) {
        errors[key] = [];
    }
    errors[key].push(message);
}

module.exports = {
    isNullOrEmptyString,
    isValidEmail,
    addError,
};
