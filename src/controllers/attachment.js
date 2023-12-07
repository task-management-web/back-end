const Attachment = require('../models/attachment');

// Tạo attachment mới
const createAttachment = async (cardId, fileUrl, userId) => {
    try {
        const newAttachment = await Attachment.create({
            cardId,
            fileUrl,
            userId,
        });

        return newAttachment;
    } catch (error) {
        console.error('Error creating attachment:', error);
        throw new Error('Could not create attachment');
    }
};

// Cập nhật attachment
const updateAttachment = async (attachmentId, newFileUrl) => {
    try {
        const attachmentToUpdate = await Attachment.findByPk(attachmentId);

        if (!attachmentToUpdate) {
            throw new Error('Attachment not found');
        }

        attachmentToUpdate.fileUrl = newFileUrl;
        await attachmentToUpdate.save();

        return attachmentToUpdate;
    } catch (error) {
        console.error('Error updating attachment:', error);
        throw new Error('Could not update attachment');
    }
};

// Xóa attachment
const deleteAttachment = async (attachmentId) => {
    try {
        const attachmentToDelete = await Attachment.findByPk(attachmentId);

        if (!attachmentToDelete) {
            throw new Error('Attachment not found');
        }

        await attachmentToDelete.destroy();

        return { message: 'Attachment deleted successfully' };
    } catch (error) {
        console.error('Error deleting attachment:', error);
        throw new Error('Could not delete attachment');
    }
};

// Hiển thị tất cả attachment của một thẻ
const getAllAttachmentsByCardId = async (req, res) => {
    const { cardId } = req.params.cardId;

    try {
        const allAttachments = await Attachment.findAll({
            where: {
                cardId: cardId,
            },
        });

        res.json(allAttachments);
    } catch (error) {
        console.error('Error fetching attachments by cardId:', error);
        res.status(500).json({ error: 'Could not fetch attachments by cardId' });
    }
};

module.exports = {
    createAttachment,
    updateAttachment,
    deleteAttachment,
    getAllAttachmentsByCardId,
};
