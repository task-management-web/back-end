const express = require("express")
const {createLabel, updateLabel, deleteLabel, getAllLabels } = require("../controllers/label");

const router = express.Router();

router.post("/createlabel",createLabel)
router.put("/update",updateLabel)
router.delete("/delete",deleteLabel)
router.get("/getalllabels",getAllLabels)

module.exports = router