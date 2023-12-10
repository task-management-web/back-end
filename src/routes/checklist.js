const express = require("express");
const {
    createChecklist,
    updateChecklist,
    deleteChecklist,
} = require("../controllers/checklist");

const router = express.Router();

router.post("/create", createChecklist);
router.put("/update", updateChecklist);
router.delete("/delete", deleteChecklist);

module.exports = router;
