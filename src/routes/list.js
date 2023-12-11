const express = require("express");
const {
    createNewList,
    deleteList,
    updateList,
    getAllLists,
    getListById
} = require("../controllers/list");

const router = express.Router();

router.post("/create", createNewList);
router.put("/update", updateList);
router.delete("/delete/:id", deleteList);
router.get("/showalllist", getAllLists);
router.get("/:id", getListById);

module.exports = router;
