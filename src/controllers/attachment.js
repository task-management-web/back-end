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

// Hiển thị thông tin attachment
const getAttachmentById = async (attachmentId) => {
    try {
        const attachment = await Attachment.findByPk(attachmentId);

        if (!attachment) {
            throw new Error('Attachment not found');
        }

        return attachment;
    } catch (error) {
        console.error('Error fetching attachment:', error);
        throw new Error('Could not fetch attachment');
    }
};

module.exports = {
    createAttachment,
    updateAttachment,
    deleteAttachment,
    getAttachmentById,
};
