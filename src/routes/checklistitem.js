const express = require("express");
const {
    createChecklistItem,
    updateChecklistItem,
    deleteChecklistItem,
    getChecklistItemsByChecklistId,
    updateChecklistItemCheckedStatus,
} = require("../controllers/checklistItem");

const router = express.Router();

router.post("/create", createChecklistItem);
router.put("/update", updateChecklistItem);
router.delete("/delete/:id", deleteChecklistItem);
router.get("/getbychecklistid/:checklistId", getChecklistItemsByChecklistId);
router.put("/getstatus/:checklistItemId", updateChecklistItemCheckedStatus);

module.exports = router;
