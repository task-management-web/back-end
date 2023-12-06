const Label = require('../models/label');

// Tạo label mới
const createLabel = async (title, color) => {
    try {
        const newLabel = await Label.create({
            title,
            color,
        });

        return newLabel;
    } catch (error) {
        console.error('Error creating label:', error);
        throw new Error('Could not create label');
    }
};

// Cập nhật label
const updateLabel = async (labelId, newTitle, newColor) => {
    try {
        const labelToUpdate = await Label.findByPk(labelId);

        if (!labelToUpdate) {
            throw new Error('Label not found');
        }

        labelToUpdate.title = newTitle;
        labelToUpdate.color = newColor;
        await labelToUpdate.save();

        return labelToUpdate;
    } catch (error) {
        console.error('Error updating label:', error);
        throw new Error('Could not update label');
    }
};

// Xóa label
const deleteLabel = async (labelId) => {
    try {
        const labelToDelete = await Label.findByPk(labelId);

        if (!labelToDelete) {
            throw new Error('Label not found');
        }

        await labelToDelete.destroy();

        return { message: 'Label deleted successfully' };
    } catch (error) {
        console.error('Error deleting label:', error);
        throw new Error('Could not delete label');
    }
};

// Hiển thị thông tin label
const getAllLabels = async () => {
    try {
        const labels = await Label.findAll();

        return labels;
    } catch (error) {
        console.error('Error fetching labels:', error);
        throw new Error('Could not fetch labels');
    }
};

module.exports = {
    createLabel,
    updateLabel,
    deleteLabel,
    getAllLabels,
};
