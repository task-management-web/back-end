const express = require("express")

const { createComment,
    updateComment,
    deleteComment,
    getCommentsByCardId,} = require("../controllers/comment")

const router = express.Router();

router.post("/create",createComment)
router.put("/update",updateComment)
router.delete("/delete",deleteComment)
router.get("/getallcommentbycardid/:cardId",getCommentsByCardId)
module.exports = router