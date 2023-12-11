const { DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/connectDb");

class Activity extends Model {}

Activity.init(
    {
        content: {
            type: DataTypes.STRING,
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
    },
    {
        sequelize,
    }
);

module.exports = Activity;
