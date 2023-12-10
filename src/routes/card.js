const express = require("express");
const {
    createNewCard, updateCard, addMemberToCard, addOrUpdateCoverImage, deleteCard, setCardDueDates, moveCardToNewList, showAllCardsInList,
    createCardLabelRelation, deleteCardLabelRelation, getCardLabels
} = require("../controllers/card")

const {
    getActivitiesByCardId, createActivity,
} = require("../controllers/activity")

const router = express.Router();

router.post("/createcard", createNewCard)
router.put("/updatecard/:cardId", updateCard)
router.post("/addmembertocard", addMemberToCard)
router.put("/changecoverimage/:cardId", addOrUpdateCoverImage)
router.delete("/delete/:cardId", deleteCard)
router.put("/setcardduedate/:cardId", setCardDueDates)
router.put("/movecardtonewlist/:cardId", moveCardToNewList)
//router.post("/createcardlabelrelation", createCardLabelRelation)
//router.delete("/deletecardlabelrelation", deleteCardLabelRelation)
//router.get("/allcardlabelrelation", getCardLabels)
router.get("/showallcardinlist/:listId", showAllCardsInList)
router.post("/log/create", createActivity)
router.get("/log/getall", getActivitiesByCardId)

module.exports = router