const sequelize = require("../configs/connectDb");
const { DataTypes } = require("sequelize");

const Broadmember = sequelize.define("Broadmember", {
  boardId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.sync();

module.exports = Broadmember;
