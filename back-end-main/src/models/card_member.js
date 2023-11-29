const sequelize = require("../configs/connectDb");
const { DataTypes } = require("sequelize");

const CardMember = sequelize.define("CardMember", {
    cardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

sequelize.sync();

module.exports = CardMember;
