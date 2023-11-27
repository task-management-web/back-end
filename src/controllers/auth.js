const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const resources = require("../helpers/resources");
const BadRequest = require("../errors/BadRequest");
const Unauthorized = require("../errors/Unauthorized");
const User = require("../models/user");

/*
 * Login.
 */
async function login(req, res, next) {
    const { userName, email, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                [Op.and]: {
                    [Op.or]: {
                        userName: userName,
                        email: email,
                    },
                    deleted: false,
                },
            },
        });

        if (!user) {
            return next(new NotFound());
        }

        // So sánh mật khẩu
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return next(new Unauthorized());
        }

        const userInfo = {
            id: user.id,
            fullName: user.fullName,
            userName: user.userName,
            email: user.email,
        };

        const token = jwt.sign({ userInfo }, process.env.SECRET_KEY, {
            expiresIn: process.env.TOKEN_EXPIRATION_TIME,
        });

        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
}

/*
 * Log out.
 */
function logout(req, res, next) {
    res.status(200).json({ message: resources.logOutSuccessfully });
}

/*
 * Verify token.
 */
function verifyToken(req, res, next) {
    const token = req.header("Authorization");

    if (!token) {
        return next(new Unauthorized());
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        req.user = payload;
        next();
    } catch (error) {
        next(new Unauthorized());
    }
}

module.exports = {
    login,
    logout,
    verifyToken,
};
