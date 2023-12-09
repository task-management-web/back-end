const enums = require("../helpers/enums");
const resources = require("../helpers/resources");
const Board = require("../models/board");
const BoardMember = require("../models/boardMember");
const User = require("../models/user");
const Forbidden = require("../errors/Forbidden");
const NotFound = require("../errors/NotFound");

const { checkBoard } = require("../helpers/boardValidation");

/*
 * Lấy thông tin tất cả các bảng của người dùng.
 */
async function getAllBoards(req, res, next) {
    try {
        const boards = await Board.findAll({
            include: {
                model: User,
                as: "users",
                attributes: [],
                where: {
                    id: req.user.id,
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
            include: {
                model: User,
                as: "users",
                attributes: [],
                where: {
                    id: req.user.id,
                },
            },
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

    try {
        // Kiểm tra quyền admin của người dùng
        const user = await User.findOne({
            where: {
                id: req.user.id,
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

        if (!user) {
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

    // Kiểm tra quyền admin của người dùng
    const user = await User.findOne({
        where: {
            id: req.user.id,
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

    if (!user) {
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
}

module.exports = {
    createBoard,
    getAllBoards,
    getBoardById,
    updateBoard,
    closeBoard,
};
