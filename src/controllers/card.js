const Card = require("../models/card");
const CardMember = require("../models/card_member");
const Attachment = require("../models/attachment");
const Checklist = require("../models/checklist");
const ChecklistItem = require("../models/checklistItem");
const Comment = require("../models/comment");
const Label = require("../models/label");
const CardLabel = require("../models/cardLabel");

const { Op } = require("sequelize");
const resources = require("../helpers/resources");
const BadRequest = require("../errors/BadRequest");
const List = require("../models/list");

// Tạo thẻ mới
const createNewCard = async (req, res) => {
    try {
        const newCard = await Card.create({
            title: req.body.title,
            description: req.body.description,
            coverUrl: req.body.coverUrl,
            ListId: req.body.listId,
            startDate: req.body.startDate,
            dueDate: req.body.dueDate,
            closed: req.body.closed,
        });

        res.json(newCard);
    } catch (error) {
        console.error("Error creating card:", error);
        throw new Error("Could not create card");
    }
};

// Cập nhật thẻ
const updateCard = async (req, res) => {
    try {
        const cardId = req.params.cardId;
        const cardToUpdate = await Card.findByPk(cardId);
        if (!cardToUpdate) {
            return res.status(404).json({ error: "Card not found" });
        }

        cardToUpdate.title = req.body.title || cardToUpdate.title;
        cardToUpdate.description =
            req.body.description || cardToUpdate.description;

        await cardToUpdate.save();

        res.json({ message: "Card updated successfully", card: cardToUpdate });
    } catch (error) {
        console.error("Error updating card:", error);
        res.status(500).json({ error: "Could not update card" });
    }
};

// Di chuyển thẻ sang một danh sách mới (Thay đổi trường ListId)
const moveCardToNewList = async (req, res) => {
    try {
        const id = req.params.cardId;
        const newListId = req.body.listId;

        const cardToMove = await Card.findByPk(id);

        if (!cardToMove) {
            return res.status(404).json({ error: "Card not found" });
        }

        const list = await List.findOne({
            where: {
                id: newListId,
            },
        });

        if (!list) {
            return res.status(404).json({ error: "List not found" });
        }

        await cardToMove.update({
            ListId: newListId,
        });

        res.json({ message: "Card moved successfully", card: cardToMove });
    } catch (error) {
        console.error("Error moving card:", error);
        res.status(500).json({ error: "Could not move card" });
    }
};

// Thêm hoặc cập nhật ảnh bìa
const addOrUpdateCoverImage = async (req, res) => {
    try {
        const id = req.params.cardId;
        const newCoverUrl = req.body.coverUrl;

        const cardToUpdate = await Card.findByPk(id);
        if (!cardToUpdate) {
            return res.status(404).json({ error: "Card not found" });
        }

        cardToUpdate.coverUrl = newCoverUrl;
        await cardToUpdate.save();

        res.json({
            message: "Cover image added/updated successfully",
            card: cardToUpdate,
        });
    } catch (error) {
        console.error("Error adding/updating cover image:", error);
        res.status(500).json({ error: "Could not add/update cover image" });
    }
};

// Thêm 1 thành viên vào thẻ
const addMemberToCard = async (req, res) => {
    try {
        const { cardId, userId } = req.body;

        const newCardMember = await CardMember.create({
            cardId,
            userId,
        });

        res.json({
            message: "Member added to card successfully",
            cardMember: newCardMember,
        });
    } catch (error) {
        console.error("Error adding member to card:", error);
        res.status(500).json({ error: "Could not add member to card" });
    }
};

// Đặt lịch cho thẻ
const setCardDueDates = async (req, res) => {
    try {
        const id = req.params.cardId;
        const { startDate, dueDate } = req.body;

        const cardToUpdate = await Card.findByPk(id);
        if (!cardToUpdate) {
            return res.status(404).json({ error: "Card not found" });
        }

        cardToUpdate.startDate = startDate || cardToUpdate.startDate;
        cardToUpdate.dueDate = dueDate || cardToUpdate.dueDate;
        await cardToUpdate.save();

        res.json({ message: "Due dates set successfully", card: cardToUpdate });
    } catch (error) {
        console.error("Error setting due dates:", error);
        res.status(500).json({ error: "Could not set due dates" });
    }
};
// Hiển thị thẻ trong toàn bộ danh sách
const showAllCardsInList = async (req, res) => {
    const listId = req.params.listId;

    try {
        const allCardsInList = await Card.findAll({
            where: {
                listId: listId,
            },
        });

        res.json(allCardsInList);
    } catch (error) {
        console.error("Error fetching cards in list:", error);
        res.status(500).json({ error: "Could not fetch cards in list" });
    }
};

// Xóa thẻ
const deleteCard = async (req, res) => {
    try {
        const id = req.params.id;

        const cardToDelete = await Card.findByPk(id);

        if (!cardToDelete) {
            return res.status(404).json({ error: "Card not found" });
        }

        await cardToDelete.update({
            closed: true,
        });

        res.json({ message: "Card deleted successfully" });
    } catch (error) {
        console.error("Error deleting card:", error);
        res.status(500).json({ error: "Could not delete card" });
    }
};

// Tạo mối quan hệ giữa card và label
const createCardLabelRelation = async (req, res) => {
    const { cardId, labelId } = req.body;

    try {
        const newCardLabelRelation = await Cardlabel.create({
            cardId,
            labelId,
        });

        res.json(newCardLabelRelation);
    } catch (error) {
        console.error("Error creating card-label relation:", error);
        throw new Error("Could not create card-label relation");
    }
};

// Xóa mối quan hệ giữa card và label
const deleteCardLabelRelation = async (req, res) => {
    const { cardId, labelId } = req.body;

    try {
        const cardLabelToDelete = await Cardlabel.findOne({
            where: { cardId, labelId },
        });

        if (!cardLabelToDelete) {
            res.status(404).json({ error: "Card-label relation not found" });
        }

        await cardLabelToDelete.destroy();

        res.json({ message: "Card-label relation deleted successfully" });
    } catch (error) {
        console.error("Error deleting card-label relation:", error);
        res.status(500).json({ error: "Could not delete card-label relation" });
    }
};

// Hiển thị các mối quan hệ card và label
const getCardLabels = async (req, res) => {
    const { cardId } = req.params;

    try {
        const cardLabels = await Cardlabel.findAll({
            where: { cardId },
        });

        res.json(cardLabels);
    } catch (error) {
        console.error("Error fetching card labels:", error);
        res.status(500).json({ error: "Could not fetch card labels" });
    }
};

/*
 * Get a card.
 */
const getCardById = async (req, res, next) => {
    const cardId = req.params.id;

    try {
        const card = await Card.findOne({
            where: {
                [Op.and]: {
                    id: cardId,
                    closed: false,
                },
            },
            include: [
                {
                    model: Attachment,
                    as: "attachments",
                    attributes: {
                        exclude: ["CardId"],
                    },
                },
                {
                    model: Checklist,
                    as: "checklists",
                    attributes: {
                        exclude: ["CardId"],
                    },
                    include: {
                        model: ChecklistItem,
                        as: "checklistItems",
                        attributes: {
                            exclude: ["ChecklistId"],
                        },
                    },
                },
                {
                    model: Comment,
                    as: "comments",
                    attributes: {
                        exclude: ["CardId"],
                    },
                },
                {
                    model: Label,
                    as: "labels",
                    through: {
                        attributes: [],
                    },
                },
            ],
        });

        res.status(200).json(card);
    } catch (error) {
        next(error);
    }
};

/*
 * Add a label to a card.
 */
const addLabelToCard = async (req, res, next) => {
    const { cardId, labelId } = req.params;

    try {
        const cardLabel = await CardLabel.findOne({
            where: {
                CardId: cardId,
                LabelId: labelId,
            },
        });

        if (cardLabel) {
            throw new BadRequest({
                message: resources.labelAlreadyAddedInCard,
            });
        }

        await CardLabel.create({
            CardId: cardId,
            LabelId: labelId,
        });

        res.status(200).json({ message: resources.addLabelToCardSuccessfully });
    } catch (error) {
        next(error);
    }
};

/*
 * Remove a label from a card.
 */
const removeLabelFromCard = async (req, res, next) => {
    const { cardId, labelId } = req.params;

    try {
        const cardLabel = await CardLabel.findOne({
            where: {
                CardId: cardId,
                LabelId: labelId,
            },
        });

        if (!cardLabel) {
            throw new BadRequest({
                message: resources.labelHasNotBeenAddedToCard,
            });
        }

        await CardLabel.destroy({
            where: {
                [Op.and]: {
                    CardId: cardId,
                    LabelId: labelId,
                },
            },
        });

        res.status(200).json({
            message: resources.removeLabelFromCardSuccessfully,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createNewCard,
    updateCard,
    addMemberToCard,
    addOrUpdateCoverImage,
    deleteCard,
    setCardDueDates,
    moveCardToNewList,
    showAllCardsInList,
    createCardLabelRelation,
    deleteCardLabelRelation,
    getCardLabels,
    getCardById,
    addLabelToCard,
    removeLabelFromCard,
};
