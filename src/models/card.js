const { DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/connectDb");

class Card extends Model {
    static associate(models) {
        Card.hasMany(models.Activity, { foreignKey: "cardId" });
        Card.hasMany(models.Checklist, { foreignKey: "cardId" });
        Card.hasMany(models.Cardlaber, { foreignKey: "cardId" });
        Card.hasMany(models.Cardmember, { foreignKey: "cardId" });
        Card.hasMany(models.Attachment, { foreignKey: "cardId" });
    }
}

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
