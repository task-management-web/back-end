const sequelize = require("../configs/connectDb");
const { DataTypes } = require("sequelize");

const Member = sequelize.define("Member", {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    MemberName: {
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

module.exports = Member;
