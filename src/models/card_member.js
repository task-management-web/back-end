const { DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/connectDb");

class CardMember extends Model {
    static associate(models) {
        CardMember.belongsTo(models.Card, { foreignKey: "cardId" });
        CardMember.belongsTo(models.User, { foreignKey: "userId" });
    }
}

CardMember.init(
    {
        cardId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "CardMember",
    }
);

module.exports = CardMember;
