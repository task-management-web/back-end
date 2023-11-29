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

/**
 * Lấy thông tin của người dùng theo ID.
 */

async function getUserById(req, res, next) {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (user) {
            res.json(user);
        } else {
            next(new NotFound());
        }
    } catch (error) {
        next(error);
    }
}

/**
 * Thêm mới một người dùng.
 */

async function createUser(req, res, next) {
    const { fullName, userName, email, password } = req.body;
    let errors = {};

    // Kiểm tra dữ liệu gửi lên từ client:

    // Kiểm tra fullName
    checkFullName(fullName, errors);

    // Kiểm tra userName
    checkUserName(userName, errors);

    // Kiểm tra email
    checkEmail(email, errors);

    // Kiểm tra password:
    checkPassword(password, errors);

    // Xử lý lỗi (nếu có)
    if (Object.keys(errors).length !== 0) {
        next(new BadRequest(errors));
        return;
    }

    // Kiểm tra lỗi nghiệp vụ

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
            status: "success",
            message: resources.signUpSuccess,
            user: {
                fullName,
                userName,
                email,
            },
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Cập nhật thông tin của người dùng.
 */

async function updateUser(req, res, next) {
    try {
        // Kiểm tra người dùng có tồn tại hay không
        const user = await User.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (user) {
            const { fullName, userName } = req.body;
            let errors = {};

            // Kiểm tra dữ liệu gửi lên từ client:

            // Kiểm tra fullName
            checkFullName(fullName, errors);

            // Kiểm tra userName
            checkUserName(userName, errors);

            // Xử lý lỗi (nếu có)
            if (Object.keys(errors).length !== 0) {
                next(new BadRequest(errors));
                return;
            }

            // Kiểm tra lỗi nghiệp vụ

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
        } else {
            next(new NotFound());
        }
    } catch (error) {
        next(error);
    }
}

/**
 * Xoá một người dùng.
 */

const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id,
            },
        });
        if (user) {
            await User.destroy({
                where: {
                    id: req.params.id,
                },
            });
            res.status(204).end();
        } else {
            next(new NotFound());
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
