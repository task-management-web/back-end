const { DataTypes } = require("sequelize");
const sequelize = require("../configs/connectDb");
const BadRequest = require("../errors/BadRequest");
const {
    checkFullName,
    checkUserName,
    checkEmail,
    checkPassword,
} = require("../helpers/validations");

const User = sequelize.define(
    "User",
    {
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
);

module.exports = User;
