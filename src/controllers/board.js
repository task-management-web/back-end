const enums = require("../helpers/enums");
const resources = require("../helpers/resources");
const Board = require("../models/board");
const BoardMember = require("../models/boardMember");
const List = require("../models/list");
const User = require("../models/user");
const BadRequest = require("../errors/BadRequest");
const Forbidden = require("../errors/Forbidden");
const NotFound = require("../errors/NotFound");

const { Op } = require("sequelize");
const { checkBoard } = require("../helpers/boardValidation");
const { isAdminOfBoard } = require("../services/board");

/*
 * Lấy thông tin tất cả các bảng của người dùng.
 */
async function getAllBoards(req, res, next) {
    const userId = req.user.id;

    try {
        const boards = await Board.findAll({
            include: {
                model: User,
                as: "users",
                attributes: [],
                where: {
                    id: userId,
                },
            },
        });

        if (!boards) {
            return next(new NotFound(resources.userHasNoBoards));
        }

        res.status(200).json(boards);
    } catch (error) {
        next(error);
    }
}

/*
 * Lấy thông tin một bảng theo ID.
 */
async function getBoardById(req, res, next) {
    try {
        const board = await Board.findOne({
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: User,
                    as: "users",
                    where: {
                        id: req.user.id,
                    },
                },
                {
                    model: List,
                    as: "lists",
                    attributes: {
                        exclude: ["BoardId"],
                    },
                },
            ],
        });

        if (!board) {
            return next(new NotFound(resources.boardDoesNotExist));
        }

        res.status(200).json(board);
    } catch (error) {
        next(error);
    }
}

/*
 * Tạo bảng.
 */
async function createBoard(req, res, next) {
    const board = req.body;

    try {
        // Kiểm tra định dạng dữ liệu
        checkBoard(board);

        // Lưu dữ liệu vào database
        const boardInserted = await Board.create(board);

        await BoardMember.create({
            UserId: req.user.id,
            BoardId: boardInserted.id,
            role: enums.role.admin,
        });

        res.status(201).json({
            message: resources.createBoardSuccessfully,
            boardId: boardInserted.id,
        });
    } catch (error) {
        next(error);
    }
}

/*
 * Cập nhật thông tin bảng.
 */
// TODO: Client có thể gửi lên đối tượng board với các trường cần cập nhật bất kỳ
async function updateBoard(req, res, next) {
    const boardId = req.params.id;
    const userId = req.user.id;

    try {
        // Kiểm tra quyền admin của người dùng
        if (!isAdminOfBoard(userId, boardId)) {
            throw new Forbidden();
        }

        const boardUpdate = req.body;

        // Kiểm tra định dạng dữ liệu bảng
        checkBoard(boardUpdate);

        // Cật nhật dữ liệu trong database
        await Board.update(boardUpdate, {
            where: {
                id: boardId,
            },
        });

        res.status(200).json({ message: resources.updateSuccessfully });
    } catch (error) {
        next(error);
    }
}

/*
 * Đóng bảng.
 */
async function closeBoard(req, res, next) {
    const boardId = req.params.id;
    const userId = req.user.id;

    try {
        // Kiểm tra quyền admin của người dùng
        if (!isAdminOfBoard(userId, boardId)) {
            throw new Forbidden();
        }

        // Cật nhật trường closed thành true
        await Board.update(
            {
                closed: true,
            },
            {
                where: {
                    id: boardId,
                },
            }
        );

        res.status(200).json({ message: resources.closeBoardSuccessfully });
    } catch (error) {
        next(error);
    }
}

/*
 * Add a member to the board.
 */
async function addMemmberToBoard(req, res, next) {
    const boardId = req.params.boardId;
    const userId = req.params.userId;
    const role = req.query.role;

    try {
        // Kiểm tra người thực hiện có phải admin của board hay không
        if (!isAdminOfBoard(req.user.id, boardId)) {
            throw new Forbidden();
        }

        // Kiểm tra người dùng cần thêm có tồn tại hay không
        const user = await User.findOne({
            where: {
                [Op.and]: {
                    id: userId,
                    deleted: false,
                },
            },
        });

        if (!user) {
            throw new BadRequest(resources.userDoesNotExist);
        }

        // Kiểm tra người dùng đã là thành viên trong bảng từ trước hay chưa
        const member = await BoardMember.findOne({
            where: {
                BoardId: boardId,
                UserId: userId,
            },
        });

        if (member) {
            throw new BadRequest(resources.userAlreadyMemberOfBoard);
        }

        // Thêm bản ghi có boardId và userId tương ứng vào BoardMember
        await BoardMember.create({
            BoardId: boardId,
            UserId: userId,
            role: enums.role[role],
        });

        res.status(200).json({
            message: resources.addMemmberToBoardSuccessfully,
        });
    } catch (error) {
        next(error);
    }
}

/*
 * Change member's role.
 */
async function changeMemberRole(req, res, next) {
    const boardId = req.params.boardId;
    const userId = req.params.userId;
    const role = req.query.role;

    try {
        // Kiểm tra người thực hiện có phải admin của board hay không
        if (!isAdminOfBoard(req.user.id, boardId)) {
            throw new Forbidden();
        }

        // Kiểm tra người dùng cần thêm có tồn tại hay không
        const user = await User.findOne({
            where: {
                [Op.and]: {
                    id: userId,
                    deleted: false,
                },
            },
        });

        if (!user) {
            throw new BadRequest(resources.userDoesNotExist);
        }

        // Kiểm tra người dùng đã là thành viên trong bảng từ trước hay chưa
        const member = await BoardMember.findOne({
            where: {
                BoardId: boardId,
                UserId: userId,
            },
        });

        if (!member) {
            throw new BadRequest(resources.userIsNotAMember);
        }

        if (member.role !== enums.role[role]) {
            await member.update({
                role: enums.role[role],
            });
        }

        res.status(200).json({
            message: resources.updateMemmberRoleSuccessfully,
        });
    } catch (error) {
        next(error);
    }
}

/*
 * Remove member from board.
 */
async function removeMemberFromBoard(req, res, next) {
    const boardId = req.params.boardId;
    const userId = req.params.userId;

    try {
        // Kiểm tra người thực hiện có phải admin của board hay không
        if (!isAdminOfBoard(req.user.id, boardId)) {
            throw new Forbidden();
        }

        // Kiểm tra người dùng cần xoá có phải thành viên của bảng hay không
        const member = await BoardMember.findOne({
            where: {
                BoardId: boardId,
                UserId: userId,
            },
        });

        if (!member) {
            throw new BadRequest(resources.userIsNotAMember);
        }

        // Xoá bản ghi có boardId và userId tương ứng trong BoardMember
        await BoardMember.destroy({
            where: {
                [Op.and]: {
                    boardId,
                    userId,
                },
            },
        });

        res.status(200).json({
            message: resources.removeMemberFromBoardSuccessfully,
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createBoard,
    getAllBoards,
    getBoardById,
    updateBoard,
    closeBoard,
    addMemmberToBoard,
    changeMemberRole,
    removeMemberFromBoard,
};
