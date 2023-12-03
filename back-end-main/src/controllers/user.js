const bcrypt = require("bcrypt");
const resources = require("../helpers/resources");
const BadRequest = require("../errors/BadRequest");
const Conflict = require("../errors/Conflict");
const NotFound = require("../errors/NotFound");
const User = require("../models/user");

const {
    checkFullName,
    checkUserName,
    checkEmail,
    checkPassword,
} = require("../helpers/validations");

const {
    userNameAlreadyExists,
    emailAlreadyExists,
} = require("../services/user");

const saltRounds = Number(process.env.SALT_ROUNDS) || 10;

/*
 * Lấy thông tin người dùng.
 */
async function getUser(req, res, next) {
    try {
        let user = await User.findOne({
            attributes: { exclude: ["password", "deleted"] },
            where: {
                id: req.user.id,
            },
        });

        if (!user) {
            throw new NotFound(resources.userNotFound);
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
}

/*
 * Tạo tài khoản người dùng.
 */
async function createUser(req, res, next) {
    const { fullName, userName, email, password } = req.body;
    let errors = {};

    checkFullName(fullName, errors);
    // TODO: Kiểm tra userName không được chứa ký tự đặc biệt như @, &, $, %, v.v.
    checkUserName(userName, errors);
    checkEmail(email, errors);
    checkPassword(password, errors);

    // Xử lý lỗi (nếu có)
    if (Object.keys(errors).length !== 0) {
        next(new BadRequest(errors));
        return;
    }

    // Kiểm tra trùng tên người dùng
    if (await userNameAlreadyExists(userName, next)) {
        next(new Conflict(resources.userNameAlreadyExists));
        return;
    }

    // Kiểm tra trùng email
    if (await emailAlreadyExists(email, next)) {
        next(new Conflict(resources.emailAlreadyExists));
        return;
    }

    try {
        // Băm mật khẩu
        const hash = await bcrypt.hash(password, saltRounds);

        // Lưu dữ liệu vào database
        await User.create({
            fullName,
            userName,
            email,
            password: hash,
        });

        res.status(201).json({
            message: resources.signUpSuccess,
            user: {
                userName,
                email,
            },
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
        // Kiểm tra người dùng có tồn tại hay không
        const user = await User.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (!user) {
            return next(new NotFound());
        }

        const { fullName, userName } = req.body;
        let errors = {};

        checkFullName(fullName, errors);
        checkUserName(userName, errors);

        // Xử lý lỗi (nếu có)
        if (Object.keys(errors).length !== 0) {
            next(new BadRequest(errors));
            return;
        }

        // Kiểm tra trùng tên người dùng
        if (await userNameAlreadyExists(userName, next)) {
            next(new Conflict(resources.userNameAlreadyExists));
            return;
        }

        // Lưu dữ liệu vào database
        await user.update({
            fullName,
            userName,
        });

        res.status(200).json({
            status: "success",
            message: resources.updateSuccessfull,
            user: {
                fullName,
                userName,
            },
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
        const user = await User.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (!user) {
            return next(new NotFound());
        }

        // Cập nhật trường "deleted" thành true
        await user.update({ deleted: true });

        res.status(204).json({ message: resources.accountDeletedSuccessfully });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
};
