const { DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/connectDb");

class Label extends Model {}

Label.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
    }
);

module.exports = Label;
