const express = require("express");
const { verifyToken } = require("../controllers/auth");
const {
    createBoard,
    getBoardById,
    updateBoard,
    closeBoard,
} = require("../controllers/board");

const router = express.Router();

router.post("/", createBoard);
router.use("/:id", verifyToken);
router.get("/:id", getBoardById);
router.put("/:id", updateBoard);
router.delete("/:id", closeBoard);

module.exports = router;
