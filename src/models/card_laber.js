'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card_Label extends Model {
    
    static associate(models) {
      // define association here
    }
  }
  Card_Label.init({
    Card_Id: DataTypes.INTEGER,
    Label_Id: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Card_Label',
  });
  return Card_Label;
};