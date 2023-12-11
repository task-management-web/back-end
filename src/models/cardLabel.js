const { DataTypes } = require("sequelize");
const sequelize = require("../configs/connectDb");

const CardLabel = sequelize.define("CardLabel", {});

module.exports = CardLabel;
