const User = require("../models/user");

/*
 * Kiểm tra trùng tên người dùng.
 */
async function userNameAlreadyExists(userName) {
    const user = await User.findOne({
        where: {
            userName: userName,
        },
    });

    return user;
}

/*
 * Kiểm tra trùng email.
 */
async function emailAlreadyExists(email) {
    const user = await User.findOne({
        where: {
            email: email,
        },
    });
    
    return user;
}

module.exports = {
    userNameAlreadyExists,
    emailAlreadyExists,
};
