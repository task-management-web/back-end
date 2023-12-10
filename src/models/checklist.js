const { DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/connectDb");

class Checklist extends Model {}

Checklist.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Checklist",
    }
);

module.exports = Checklist;
