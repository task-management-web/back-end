// Create a connection to the database
const sequelize = require("../configs/connectDb");

const Activity = require("./activity");
const Attachment = require("./attachment");
const Board = require("./board");
const BoardMember = require("./boardMember");
const Card = require("./card");
const CardLabel = require("./cardLabel");
const CardMember = require("./card_member");
const Checklist = require("./checklist");
const ChecklistItem = require("./checklistItem");
const Comment = require("./comment");
const Label = require("./label");
const List = require("./list");
const User = require("./user");

// Declare associations between tables
Board.belongsToMany(User, { through: BoardMember, as: "users" });
User.belongsToMany(Board, { through: BoardMember, as: "boards" });

Board.hasMany(List, { as: "lists" });
List.belongsTo(Board);

Board.hasMany(Label, { as: "labels" });
Label.belongsTo(Board);

List.hasMany(Card, { as: "cards" });
Card.belongsTo(List);

Card.hasMany(Attachment, { as: "attachments" });
Attachment.belongsTo(Card);

Card.hasMany(Checklist, { as: "checklists" });
Checklist.belongsTo(Card);

Card.hasMany(Comment, { as: "comments" });
Comment.belongsTo(Card);

Card.belongsToMany(Label, { through: CardLabel, as: "labels" });
Label.belongsToMany(Card, { through: CardLabel, as: "cards" });

Checklist.hasMany(ChecklistItem, { as: "checklistItems" });
ChecklistItem.belongsTo(Checklist);

User.hasMany(Attachment, { as: "attachments" });
Attachment.belongsTo(User);

User.hasMany(Comment, { as: "comments" });
Comment.belongsTo(User);

// Create tables in the database
(async () => {
    await sequelize.sync({ alter: true });
})();

module.exports = sequelize;
