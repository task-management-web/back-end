const express = require("express")

const { createComment,
    updateComment,
    deleteComment,
    getCommentsByCardId,} = require("../controllers/comment")

const router = express.Router();

router.post("/comment/create")
router.pust("/comment/update")
router.delete("/comment/delete")
router.get("/comment/getallcommentbycardid")