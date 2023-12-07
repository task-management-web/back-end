const express = require("express");
const {
    createNewCard ,updateCard ,addMemberToCard ,addOrUpdateCoverImage ,deleteCard ,setCardDueDates ,moveCardToNewList, showAllCardsInList,
    createCardLabelRelation, deleteCardLabelRelation, getCardLabels
} = require("../controllers/card")

const router = express.Router();

router.post("/card/createcard",createNewCard)
router.put("/card/updatecard",updateCard)
router.post("/card/addmembertocard",addMemberToCard)
router.put("/card/changecoverimage",addOrUpdateCoverImage)
router.delete("/card/delete",deleteCard)
router.post("/card/setcardduedate",setCardDueDates)
router.put("/card/movecardtonewlist",moveCardToNewList)
router.post("/card/createcardlabelrelation",createCardLabelRelation)
router.delete("/card/deletecardlabelrelation",deleteCardLabelRelation)
router.get("/card/allcardlabelrelation",getCardLabels)
router.get("/card/showallcardinlist",showAllCardsInList)