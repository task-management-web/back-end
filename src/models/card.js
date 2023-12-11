const { DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/connectDb");

class Card extends Model {}

Card.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        coverUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
        },
        dueDate: {
            type: DataTypes.DATE,
        },
        closed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
    }
);

module.exports = Card;
