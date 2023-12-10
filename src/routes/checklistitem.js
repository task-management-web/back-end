const express = require("express")
const { 
    createChecklistItem, updateChecklistItem, 
    deleteChecklistItem, getChecklistItemsByChecklistId, 
    updateChecklistItemCheckedStatus} = require("../controllers/check_list_item")

const router = express.Router();

router.post("/create",createChecklistItem)
router.put("/update",updateChecklistItem)
router.delete("/delete",deleteChecklistItem)
router.get("/getbychecklistid/:checklistId",getChecklistItemsByChecklistId)
router.put("/getstatus/:checklistItemId",updateChecklistItemCheckedStatus)

module.exports = router