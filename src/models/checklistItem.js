const { DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/connectDb");

class Checklistitem extends Model {}

Checklistitem.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dueDate: {
            type: DataTypes.DATE,
        },
        checked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
    }
);

module.exports = Checklistitem;
