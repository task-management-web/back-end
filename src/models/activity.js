const { DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/connectDb");

class Activity extends Model {
    static associate(models) {
        Activity.belongsTo(models.Card, {
            foreignKey: "cardId",
            targetKey: "id",
        });
        Activity.belongsTo(models.User, {
            foreignKey: "userId",
            targetKey: "id",
        });
    }
}

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
        modelName: "Activity", // Tên của mô hình
    }
);

module.exports = Activity;
