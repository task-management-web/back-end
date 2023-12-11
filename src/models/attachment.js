const { DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/connectDb");

class Attachment extends Model {}

Attachment.init(
    {
        fileUrl: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
    }
);

module.exports = Attachment;
