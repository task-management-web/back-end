const { DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/connectDb");

class Checklist extends Model {
    static associate(models){
        Checklist.hasMany(models.Checklistitem, { foreignKey: 'checklistId' });  
        Checklist.belongsTo(models.Card, { foreignKey: 'cardId' ,targetKey: 'id' });   
    }
}

Checklist.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cardId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Checklist', 
  }
);

sequelize.sync(); 
module.exports = Checklist;
