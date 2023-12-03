const { DataTypes } = require("sequelize");
const sequelize = require("../configs/connectDb");

const BoardMember = sequelize.define("BoardMember", {
    role: DataTypes.INTEGER,
});

module.exports = BoardMember;
