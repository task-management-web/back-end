const { DataTypes } = require("sequelize");
const sequelize = require("../configs/connectDb");

const Board = sequelize.define("Board", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    backgroundUrl: {
        type: DataTypes.TEXT,
    },
    closed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = Board;
