const express = require("express")

const { createComment,
    updateComment,
    deleteComment,
    getCommentsByCardId,} = require("../controllers/comment")

const router = express.Router();

router.post("/comment/create",createComment)
router.pust("/comment/update",updateComment)
router.delete("/comment/delete",deleteComment)
router.get("/comment/getallcommentbycardid",getCommentsByCardId)

module.exports = router