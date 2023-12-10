const express = require("express")
const {createAttachment,
    updateAttachment,
    deleteAttachment,
    getAllAttachmentsByCardId} = require("../controllers/attachment")


const router = express.Router();

router.post("/create",createAttachment)
router.put("/update",updateAttachment)
router.delete("/delete",deleteAttachment)
router.get("/getall",getAllAttachmentsByCardId)

module.exports = router;