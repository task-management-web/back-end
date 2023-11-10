const sequelize = require("../configs/connectDb");
const { DataTypes } = require("sequelize");

const User = sequelize.define("User", {
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
});

sequelize.sync();

module.exports = User;
