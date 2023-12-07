const express = require("express")
const { 
    createChecklistItem, updateChecklistItem, 
    deleteChecklistItem, getChecklistItemsByChecklistId, 
    updateChecklistItemCheckedStatus} = require("../controllers/check_list_item")

const router = express.Router();

router.post("/checklistitem/create",createChecklistItem)
router.put("/checklistitem/update",updateChecklistItem)
router.delete("/checklistitem/delete",deleteChecklistItem)
router.get("/checklistitem/getbychecklistid",getChecklistItemsByChecklistId)
router.put("checklistitem/getstatus",updateChecklistItemCheckedStatus)

module.exports = router