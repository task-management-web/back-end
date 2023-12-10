const express = require("express")
const {createChecklist, updateChecklist, deleteChecklist,showChecklistsByCardId } = require("../controllers/checklist")

const router = express.Router();

router.post("/create",createChecklist)
router.put("/update",updateChecklist)
router.delete("/delete",deleteChecklist)
router.get("/getall/:cardId",showChecklistsByCardId)

module.exports = router