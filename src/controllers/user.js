const bcrypt = require("bcrypt");
const resources = require("../helpers/resources");
const BadRequest = require("../errors/BadRequest");
const Conflict = require("../errors/Conflict");
const NotFound = require("../errors/NotFound");
const User = require("../models/user");

const { isNullOrEmptyString } = require("../helpers/common");

const {
    checkFullName,
    checkUserName,
    checkEmail,
    checkPassword,
} = require("../helpers/userValidation");

const {
    userNameAlreadyExists,
    emailAlreadyExists,
} = require("../services/user");

const saltRounds = Number(process.env.SALT_ROUNDS) || 10;

/*
 * Lấy thông tin người dùng.
 */
function getUser(req, res, next) {
    res.status(200).json(req.user);
}

/*
 * Kiểm tra định dạng dữ liệu người dùng.
 */
function checkUserDataFormat(user) {
    const { fullName, userName, email, password } = user;
    let errors = {};

    checkFullName(fullName, errors);
    checkUserName(userName, errors);
    checkEmail(email, errors);
    checkPassword(password, "password", errors);

    if (Object.keys(errors).length !== 0) {
        throw new BadRequest(errors);
    }
}

/*
 * Kiểm tra xung đột dữ liệu người dùng.
 */
async function checkUserDataConflict(user) {
    const { userName, email } = user;
    let errors = {};

    // Kiểm tra trùng tên người dùng
    if (await userNameAlreadyExists(userName)) {
        addError(errors, "userName", resources.userNameAlreadyExists);
    }

    // Kiểm tra trùng email
    if (await emailAlreadyExists(email)) {
        addError(errors, "email", resources.emailAlreadyExists);
    }

    if (Object.keys(errors).length !== 0) {
        throw new Conflict(errors);
    }
}

/*
 * Tạo tài khoản người dùng.
 */
async function createUser(req, res, next) {
    try {
        const user = req.body;

        // Kiểm tra định dạng dữ liệu
        checkUserDataFormat(user);

        // Kiểm tra xung đột dữ liệu
        await checkUserDataConflict(user);

        // Băm mật khẩu
        const hash = await bcrypt.hash(user.password, saltRounds);

        // Lưu dữ liệu vào database
        await User.create({
            fullName: user.fullName,
            userName: user.userName,
            email: user.email,
            password: hash,
        });

        res.status(201).json({
            message: resources.signUpSuccess,
        });
    } catch (error) {
        next(error);
    }
}

/*
 * Cập nhật thông tin người dùng.
 */
async function updateUser(req, res, next) {
    try {
        const { fullName } = req.body;

        if (isNullOrEmptyString(fullName)) {
            let errors = {};

            checkFullName(fullName, errors);

            if (Object.keys(errors).length !== 0) {
                throw new BadRequest(errors);
            }
        }

        // Lưu dữ liệu vào database
        await req.user.update({
            fullName,
        });

        res.status(200).json({
            message: resources.updateSuccessfull,
        });
    } catch (error) {
        next(error);
    }
}

/*
 * Xoá tài khoản người dùng.
 */
async function deleteUser(req, res, next) {
    try {
        // Cập nhật trường "deleted" thành true
        await req.user.update({
            deleted: true,
        });

        res.status(200).json({ message: resources.userDeleted });
    } catch (error) {
        next(error);
    }
}

/*
 * Đổi mật khẩu.
 */
async function changePassword(req, res, next) {
    const oldPassword = req.body.oldPassword || "";
    const newPassword = req.body.newPassword || "";
    const confirmPassword = req.body.confirmPassword || "";
    let errors = {};

    try {
        // Lấy mật khẩu từ database
        const user = await User.findOne({
            attributes: ["password"],
            where: {
                id: req.user.id,
            },
        });

        // So sánh mật khẩu
        const isValidPassword = await bcrypt.compare(
            oldPassword,
            user.password
        );

        if (!isValidPassword) {
            addError(errors, "oldPassword", resources.wrongPassword);
        }

        // Kiểm tra định dạng mật khẩu mới
        checkPassword(newPassword, "newPassword", errors);

        // Kiểm tra xác nhận mật khẩu mới
        if (newPassword !== confirmPassword) {
            addError(
                errors,
                "confirmPassword",
                resources.confirmPasswordDoesNotMatch
            );
        }

        if (Object.keys(errors).length !== 0) {
            throw new BadRequest(errors);
        }

        // Băm mật khẩu mới
        const hash = await bcrypt.hash(newPassword, saltRounds);

        // Lưu trữ mật khẩu mới
        await req.user.update({
            password: hash,
        });

        res.status(200).json({ message: resources.changePasswordSuccessfully });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    changePassword,
};
