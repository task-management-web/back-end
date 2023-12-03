const sequelize = require("../configs/connectDb");
const { DataTypes } = require("sequelize");

const Broad = sequelize.define("Broad", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  backgroundUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  closed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

sequelize.sync();

module.exports = Broad;
