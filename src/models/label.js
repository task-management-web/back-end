const { DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/connectDb");

class Label extends Model {
    static associate(models) {
        Label.hasMany(models.Cardlabel, { foreignKey: "labelId" });
    }
}

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
