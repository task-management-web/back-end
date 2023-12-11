const { DataTypes } = require("sequelize");
const sequelize = require("../configs/connectDb");

const CardLabel = sequelize.define("CardLabel", {
    role: DataTypes.INTEGER,
});

module.exports = CardLabel;
