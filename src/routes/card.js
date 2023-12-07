const express = require("express");
const {
    createNewCard ,updateCard ,addMemberToCard ,addOrUpdateCoverImage ,deleteCard ,setCardDueDates ,moveCardToNewList, showAllCardsInList,
    createCardLabelRelation, deleteCardLabelRelation, getCardLabels
} = require("../controllers/card")

const {
    getActivitiesByCardId, createActivity,
} = require("../controllers/activity")

const router = express.Router();

router.post("/card/createcard",createNewCard)
router.put("/card/updatecard/:cardId",updateCard)
router.post("/card/addmembertocard",addMemberToCard)
router.put("/card/changecoverimage/:cardId",addOrUpdateCoverImage)
router.delete("/card/delete/:cardId",deleteCard)
router.post("/card/setcardduedate",setCardDueDates)
router.put("/card/movecardtonewlist/:cardId",moveCardToNewList)
router.post("/card/createcardlabelrelation",createCardLabelRelation)
router.delete("/card/deletecardlabelrelation",deleteCardLabelRelation)
router.get("/card/allcardlabelrelation",getCardLabels)
router.get("/card/showallcardinlist/:listId",showAllCardsInList)
router.post("/card/log/create",createActivity)
router.get("/card/log/getall",getActivitiesByCardId  )

module.exports = router