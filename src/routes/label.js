const express = require("express")
const {createLabel, updateLabel, deleteLabel, getAllLabels } = require("../controllers/label");

const router = express.Router();

router.post("/label/createlabel",createLabel)
router.put("/label/update",updateLabel)
router.delete("/label/delete",deleteLabel)
router.get("/label/getalllabels",getAllLabels)

module.exports = router