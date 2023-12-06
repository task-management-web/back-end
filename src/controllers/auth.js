const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const resources = require("../helpers/resources");
const NotFound = require("../errors/NotFound");
const Unauthorized = require("../errors/Unauthorized");
const User = require("../models/user");

/*
 * Login.
 */
async function login(req, res, next) {
    const userName = req.body.userName || "";
    const password = req.body.password || "";

    try {
        const userData = await User.findOne({
            where: {
                [Op.and]: {
                    [Op.or]: {
                        userName: userName,
                        email: userName,
                    },
                    deleted: false,
                },
            },
        });

        if (!userData) {
            throw new Unauthorized(resources.wrongUsernameOrPassword);
        }

        // Compare passwords
        const isValidPassword = await bcrypt.compare(
            password,
            userData.password
        );

        if (!isValidPassword) {
            throw new Unauthorized(resources.wrongUsernameOrPassword);
        }

        const user = {
            id: userData.id,
        };

        // Create tokens
        const token = jwt.sign(user, process.env.SECRET_KEY, {
            expiresIn: process.env.TOKEN_EXPIRATION_TIME,
        });

        res.status(200).json({
            token,
            tokenExpirationTime: process.env.TOKEN_EXPIRATION_TIME,
            userId: userData.id,
        });
    } catch (error) {
        next(error);
    }
}

/*
 * Log out.
 * TODO: Quản lý token để đăng xuất nghiêm ngặt hơn.
 */
function logout(req, res, next) {
    res.status(200).json({ message: resources.logOutSuccessfully });
}

/*
 * Verify token.
 */
async function verifyToken(req, res, next) {
    const token = req.header("Authorization");

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findOne({
            attributes: { exclude: ["password", "deleted"] },
            where: {
                [Op.and]: {
                    id: decoded.id,
                    deleted: false,
                },
            },
        });

        if (!user) {
            throw new NotFound(resources.userDoesNotExist);
        }

        req.user = user;
        next();
    } catch (error) {
        if (error instanceof NotFound) {
            next(error);
        }
        next(new Unauthorized());
    }
}

module.exports = {
    login,
    logout,
    verifyToken,
};
