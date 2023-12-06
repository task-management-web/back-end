<<<<<<< HEAD
const NotFound = require("../errors/NotFound");
const Board = require("../models/board");

/*
 * Lấy thông tin bảng.
=======
const enums = require("../helpers/enums");
const resources = require("../helpers/resources");
const Board = require("../models/board");
const BoardMember = require("../models/boardMember");
const BadRequest = require("../errors/BadRequest");
const NotFound = require("../errors/NotFound");

const { checkTitle, checkDescription } = require("../helpers/boardValidation");

/*
 * Lấy thông tin tất cả các bảng của người dùng.
 */
async function getAllBoards(req, res, next) {
    res.send("Hello!");
}

/*
 * Lấy thông tin một bảng theo ID.
>>>>>>> 09091a419af5164b97e2c1c2166ddf5750d6730a
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
<<<<<<< HEAD
=======
 * Kiểm tra định dạng dữ liệu bảng.
 */
function checkBoard(board) {
    const { title, description, backgroundUrl } = board;
    let errors = {};

    checkTitle(title, errors);
    checkDescription(description, errors);

    if (Object.keys(errors).length !== 0) {
        throw new BadRequest(errors);
    }
}

/*
>>>>>>> 09091a419af5164b97e2c1c2166ddf5750d6730a
 * Tạo bảng.
 */
async function createBoard(req, res, next) {
    const board = req.body;

    try {
<<<<<<< HEAD
        const newBoard = Board.create(board);
        res.status(201);
=======
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
>>>>>>> 09091a419af5164b97e2c1c2166ddf5750d6730a
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
<<<<<<< HEAD
=======
    getAllBoards,
>>>>>>> 09091a419af5164b97e2c1c2166ddf5750d6730a
    getBoardById,
    updateBoard,
    closeBoard,
};
