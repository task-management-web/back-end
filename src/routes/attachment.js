const express = require("express")
const {createAttachment,
    updateAttachment,
    deleteAttachment,
    getAllAttachmentsByCardId} = require("../controllers/attachment")


const router = express.Router();

router.post("/attachment/create",createAttachment)
router.put("/attachment/update",updateAttachment)
router.delete("/attachment/delete",deleteAttachment)
router.get("/attachment/getall/:cardId",getAllAttachmentsByCardId)

module.exports = router;