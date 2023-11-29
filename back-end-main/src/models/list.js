const sequelize = require("../configs/connectDb");
const { DataTypes } = require("sequelize");

const List = sequelize.define("List", {
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

sequelize.sync();

module.exports = List;
