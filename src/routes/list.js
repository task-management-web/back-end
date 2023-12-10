const express = require("express")
const {createNewList, deleteList, updateList, getAllLists} = require("../controllers/list")

const router = express.Router()

router.post("/create",createNewList)
router.put("/update",updateList)
router.delete("/delete",deleteList)
router.get("/showalllist",getAllLists)

module.exports = router