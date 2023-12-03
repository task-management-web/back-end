const { DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/connectDb");

class Checklistitem extends Model {
    static associate(models){ 
        Checklistitem.belongsTo(models.Checklist, { foreignKey: 'checklistId' ,targetKey: 'id' });   
    }
}

Checklistitem.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    checklistId: {
      type: DataTypes.INTEGER,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    checked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Checklistitem', 
  }
);

sequelize.sync(); 

module.exports = Checklistitem;
