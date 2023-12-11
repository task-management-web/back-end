const express = require("express");
const {
    createLabel,
    updateLabel,
    deleteLabel,
    getAllLabels,
} = require("../controllers/label");

const router = express.Router();

router.post("/create", createLabel);
router.put("/update", updateLabel);
router.delete("/delete/:id", deleteLabel);
router.get("/getalllabel", getAllLabels);

module.exports = router;
