// Create a connection to the database
const sequelize = require("../configs/connectDb");

const Board = require("./board");
const BoardMember = require("./boardMember");
const User = require("./user");

// Declare associations between tables
Board.belongsToMany(User, { through: BoardMember, as: "users" });
User.belongsToMany(Board, { through: BoardMember, as: "boards" });

// Create tables in the database
(async () => {
    await sequelize.sync({ alter: true });
})();

module.exports = sequelize;
