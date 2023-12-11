const { DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/connectDb");

class Cardlabel extends Model {}

Cardlabel.init(
    {},
    {
        sequelize,
        modelName: "Cardlabel",
    }
);

module.exports = Cardlabel;
