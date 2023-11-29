const sequelize = require("../configs/connectDb");
const { DataTypes } = require("sequelize");

const Checklist = sequelize.define("Checklist", {
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    cardId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

sequelize.sync();

module.exports = Checklist;
