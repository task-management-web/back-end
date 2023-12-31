const express = require("express");
const { verifyToken } = require("../controllers/auth");
const {
    createBoard,
    getAllBoards,
    getBoardById,
    updateBoard,
    closeBoard,
    addMemmberToBoard,
    changeMemberRole,
    removeMemberFromBoard,
} = require("../controllers/board");

const router = express.Router();

router.use("/", verifyToken);
router.post("/", createBoard);
router.get("/", getAllBoards);
router.get("/:id", getBoardById);
router.put("/:id", updateBoard);
router.delete("/:id", closeBoard);
router.post("/:boardId/members/:userId", addMemmberToBoard);
router.put("/:boardId/members/:userId", changeMemberRole);
router.delete("/:boardId/members/:userId", removeMemberFromBoard);

module.exports = router;
