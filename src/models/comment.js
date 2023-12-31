const { DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/connectDb");

class Comment extends Model {}

Comment.init(
    {
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
    }
);

module.exports = Comment;
