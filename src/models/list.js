'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    
    static associate(models) {
      // define association here
    }
  }
  List.init({
    Title: DataTypes.TEXT,
    Position: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'List',

  });
  return List;
};