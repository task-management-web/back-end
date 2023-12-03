const NotFound = require("../errors/NotFound");
const Board = require("../models/board");

/*
 * Lấy thông tin bảng.
 */
async function getBoardById(req, res, next) {
    try {
        const board = await Board.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (!board) {
            return next(new NotFound());
        }

        res.json(board);
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
        const newBoard = Board.create(board);
        res.status(201);
    } catch (error) {
        next(error);
    }
}

/*
 * Cập nhật thông tin bảng.
 */
async function updateBoard(req, res, next) {
    // Do something ...
}

/*
 * Đóng bảng.
 */
async function closeBoard(req, res, next) {
    // Do something ...
}

module.exports = {
    createBoard,
    getBoardById,
    updateBoard,
    closeBoard,
};
