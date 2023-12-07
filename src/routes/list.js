const express = require("express")
const {createNewList, deleteList, updateList, getAllLists} = require("../controllers/list")

const router = express.Router()

router.post("/list/create",createNewList)
router.put("/list/update",updateList)
router.delete("./list/delete",deleteList)
router.get("/list/showalllist",getAllLists)

module.exports = router