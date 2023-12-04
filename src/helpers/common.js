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

module.exports = {
    isNullOrEmptyString,
    isValidEmail,
};
