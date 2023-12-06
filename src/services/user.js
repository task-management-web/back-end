const User = require("../models/user");

/*
 * Kiểm tra trùng tên người dùng.
 */
<<<<<<< HEAD
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
=======
async function userNameAlreadyExists(userName) {
    const user = await User.findOne({
        where: {
            userName: userName,
        },
    });

    return user;
>>>>>>> 09091a419af5164b97e2c1c2166ddf5750d6730a
}

/*
 * Kiểm tra trùng email.
 */
<<<<<<< HEAD
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
=======
async function emailAlreadyExists(email) {
    const user = await User.findOne({
        where: {
            email: email,
        },
    });
    
    return user;
>>>>>>> 09091a419af5164b97e2c1c2166ddf5750d6730a
}

module.exports = {
    userNameAlreadyExists,
    emailAlreadyExists,
};
