const express = require("express");
const { verifyToken } = require("../controllers/auth");
const {
    createBoard,
    getAllBoards,
    getBoardById,
    updateBoard,
    closeBoard,
} = require("../controllers/board");

const router = express.Router();

router.use("/", verifyToken);
router.post("/", createBoard);
router.get("/", getAllBoards);
router.get("/:id", getBoardById);
router.put("/:id", updateBoard);
router.delete("/:id", closeBoard);

module.exports = router;
