const bcrypt = require("bcrypt");
const resources = require("../helpers/resources");
const BadRequest = require("../errors/BadRequest");
const Conflict = require("../errors/Conflict");
const NotFound = require("../errors/NotFound");
const User = require("../models/user");

const {
    addError,
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
// TODO: Xử lý chỉ kiểm tra và cập nhật những trường được gửi lên.
function checkUserDataFormat(user) {
    const { fullName, userName, email, password } = user;
    let errors = {};

    checkFullName(fullName, errors);
    // TODO: Kiểm tra userName không được chứa ký tự đặc biệt như @, &, $, %, v.v.
    checkUserName(userName, errors);
    checkEmail(email, errors);
    checkPassword(password, errors);

    // Xử lý lỗi (nếu có)
    if (Object.keys(errors).length !== 0) {
        throw new BadRequest(errors);
    }
}

/*
 * Kiểm tra xung đột dữ liệu người dùng.
 */
// TODO: Xử lý chỉ kiểm tra và cập nhật những trường được gửi lên.
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

    // Xử lý lỗi (nếu có)
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
// TODO: Xử lý chỉ kiểm tra và cập nhật những trường được gửi lên.
async function updateUser(req, res, next) {
    try {
        const { fullName } = req.body;
        let errors = {};

        checkFullName(fullName, errors);

        // Xử lý lỗi (nếu có)
        if (Object.keys(errors).length !== 0) {
            throw new BadRequest(errors);
        }

        // Lưu dữ liệu vào database
        await user.update(
            {
                fullName,
            },
            {
                where: {
                    id: req.user.id,
                },
            }
        );

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
        await req.user.update(
            {
                deleted: true,
            },
            {
                where: {
                    id: req.user.id,
                },
            }
        );

        res.status(200).json({ message: resources.userDeleted });
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
