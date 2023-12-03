const { DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/connectDb");

class Cardlabel extends Model {
    static associate(models){
        Cardlaber.belongsTo(models.Card, { foreignKey: 'cardId' ,targetKey: 'id' });
        Cardlaber.belongsTo(models.Label, { foreignKey: 'labelId' ,targetKey: 'id' });
    }
}

Cardlabel.init(
  {
    cardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    labelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Cardlabel', 
  }
);

sequelize.sync(); 

module.exports = Cardlabel;
