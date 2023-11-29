const sequelize = require("../configs/connectDb");
const { DataTypes } = require("sequelize");

const Activity = sequelize.define("Activity", {
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },  
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

sequelize.sync();

module.exports = Activity;
