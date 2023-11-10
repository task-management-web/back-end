const User = require("../models/user");

/**
 * Kiểm tra trùng tên người dùng.
 */
async function userNameAlreadyExists(userName, next) {
    try {
        const user = await User.findOne({
            where: {
                userName: userName,
            },
        });
        return user;
    } catch (error) {
        next(error);
    }
}

/**
 * Kiểm tra trùng email.
 */
async function emailAlreadyExists(email, next) {
    try {
        const user = await User.findOne({
            where: {
                email: email,
            },
        });
        return user;
    } catch (error) {
        next(error);
    }
}

module.exports = {
    userNameAlreadyExists,
    emailAlreadyExists,
};
