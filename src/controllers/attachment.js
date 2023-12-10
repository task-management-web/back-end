const Attachment = require("../models/attachment");

// Tạo attachment mới
const createAttachment = async (req, res, next) => {
    try {
        const { cardId, fileUrl, userId } = req.body;

        const newAttachment = await Attachment.create({
            fileUrl,
            CardId: cardId,
            UserId: userId,
        });

        res.status(201).json(newAttachment);
    } catch (error) {
        console.error("Error creating attachment:", error);
        return res.status(500).json({ error: "Could not create attachment" });
    }
};

// Cập nhật attachment
const updateAttachment = async (req, res, next) => {
    try {
        const { attachmentId, newFileUrl } = req.body;

        const attachmentToUpdate = await Attachment.findByPk(attachmentId);

        if (!attachmentToUpdate) {
            return res.status(404).json({ error: "Attachment not found" });
        }

        attachmentToUpdate.fileUrl = newFileUrl;
        await attachmentToUpdate.save();

        res.status(200).json(attachmentToUpdate);
    } catch (error) {
        console.error("Error updating attachment:", error);
        return res.status(500).json({ error: "Could not update attachment" });
    }
};

// Xóa attachment
const deleteAttachment = async (req, res, next) => {
    try {
        const { attachmentId } = req.body;

        const attachmentToDelete = await Attachment.findByPk(attachmentId);

        if (!attachmentToDelete) {
            return res.status(404).json({ error: "Attachment not found" });
        }

        await attachmentToDelete.destroy();

        res.status(200).json({ message: "Attachment deleted successfully" });
    } catch (error) {
        console.error("Error deleting attachment:", error);
        return res.status(500).json({ error: "Could not delete attachment" });
    }
};

// Hiển thị tất cả attachment của một thẻ
const getAllAttachmentsByCardId = async (req, res, next) => {
    const { cardId } = req.body;

    try {
        const allAttachments = await Attachment.findAll({
            where: {
                cardId: cardId,
            },
        });

        res.status(200).json(allAttachments);
    } catch (error) {
        console.error("Error fetching attachments by cardId:", error);
        res.status(500).json({
            error: "Could not fetch attachments by cardId",
        });
    }
};

module.exports = {
    createAttachment,
    updateAttachment,
    deleteAttachment,
    getAllAttachmentsByCardId,
};
