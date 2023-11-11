const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const resources = require("../helpers/resources");
const BadRequest = require("../errors/BadRequest");
const Unauthorized = require("../errors/Unauthorized");
const User = require("../models/user");

/**
 * Đăng nhập.
 */
async function login(req, res, next) {
    const { userName, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                userName: userName,
            },
        });

        if (!user) {
            return next(new NotFound());
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return next(new Unauthorized());
        }

        const payload = {
            id: user.id,
            fullName: user.fullName,
            userName: user.userName,
            email: user.email,
        };

        const token = jwt.sign({ payload }, process.env.SECRET_KEY, {
            expiresIn: "1h",
        });

        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
}

/**
 * Đăng xuất.
 */

function logout(req, res, next) {
    res.send({ message: resources.logOutSuccessfully });
}

/**
 * Xác thực token.
 */

function verifyToken(req, res, next) {
    const token = req.header("Authorization");

    if (!token) {
        return next(new BadRequest());
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
