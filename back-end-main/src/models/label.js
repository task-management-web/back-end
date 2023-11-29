const sequelize = require("../configs/connectDb");
const { DataTypes } = require("sequelize");

const Label = sequelize.define("Label", {
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

sequelize.sync();

module.exports = Label;
