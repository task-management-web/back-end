const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const resources = require("../helpers/resources");
const BadRequest = require("../errors/BadRequest");
const NotFound = require("../errors/NotFound");
const Unauthorized = require("../errors/Unauthorized");
const User = require("../models/user");

/*
 * Login.
 */
async function login(req, res, next) {
    const { userName, password } = req.body;

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
            throw new NotFound();
        }

        // Compare passwords
        const isValidPassword = await bcrypt.compare(
            password,
            userData.password
        );

        if (!isValidPassword) {
            throw new Unauthorized();
        }

        const user = {
            id: userData.id,
        };

        const token = jwt.sign(user, process.env.SECRET_KEY, {
            expiresIn: process.env.TOKEN_EXPIRATION_TIME,
        });

        res.status(200).json({ token });
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
function verifyToken(req, res, next) {
    const token = req.header("Authorization");

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
