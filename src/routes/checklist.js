const express = require("express")
const {createChecklist, updateChecklist, deleteChecklist,} = require("../controllers/checklist")

const router = express.Router();

router.post("/checklist/create")
router.put("/checklist/update")
router.delete("/checklist/delete")

module.exports = router