const { DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/connectDb");

class Attachment extends Model {
    static associate(models){
        Attachment.belongsTo(models.Card, { foreignKey: 'cardId' ,targetKey: 'id' });
        Attachment.belongsTo(models.User, { foreignKey: 'userId' ,targetKey: 'id' });
    }
}

Attachment.init(
  {
    cardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fileUrl: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Attachment', 
  }
);

sequelize.sync(); 

module.exports = Attachment;
