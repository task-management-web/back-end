const { DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/connectDb");


class Card extends Model {
  static associate(models) {
    Card.hasMany(models.Activity, { foreignKey: 'cardId'  });
    Card.hasMany(models.Checklist, { foreignKey: 'cardId'   });
    Card.hasMany(models.Cardlaber, { foreignKey: 'cardId'  });
    Card.hasMany(models.Cardmember, { foreignKey: 'cardId'  });
    Card.hasMany(models.Attachment, { foreignKey: 'cardId'  });
    Card.hasMany(models.Comment, { foreignKey: 'cardId'  });

    Card.belongsTo(models.List, { foreignKey: 'listId',targetKey: 'id'  });
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
    listId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    closed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Card', 
  }
);

module.exports = Card;
