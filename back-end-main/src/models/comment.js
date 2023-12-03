const { DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/connectDb");

class Comment extends Model {
    static associate(models){
        Comment.belongsTo(models.Card, { foreignKey: 'cardId' ,targetKey: 'id'  });
        Comment.belongsTo(models.User, { foreignKey: 'userId',targetKey: 'id'  });
    }
}

Comment.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cardId: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Comment', 
  }
);

sequelize.sync(); 
module.exports = Comment;
