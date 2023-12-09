const enums = require("../helpers/enums");
const Board = require("../models/board");
const User = require("../models/user");

async function isAdminOfBoard(userId, boardId) {
    const user = await User.findOne({
        where: {
            id: userId,
        },
        include: {
            model: Board,
            as: "boards",
            where: {
                id: boardId,
            },
            through: {
                where: {
                    role: enums.role.admin,
                },
            },
        },
    });

    return user;
}

module.exports = {
    isAdminOfBoard,
};
