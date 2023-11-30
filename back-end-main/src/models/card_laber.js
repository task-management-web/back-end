const sequelize = require("../configs/connectDb");
const { DataTypes } = require("sequelize");

const Cardlabel = sequelize.define("Cardlabel", {
    cardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    labelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

sequelize.sync();

module.exports = Cardlabel;
