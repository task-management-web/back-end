const Checklist = require('../models/checklist');

// Tạo checklist mới
const createChecklist = async (title, cardId) => {
    try {
        const newChecklist = await Checklist.create({
            title,
            cardId,
        });

        return newChecklist;
    } catch (error) {
        console.error('Error creating checklist:', error);
        throw new Error('Could not create checklist');
    }
};

// Cập nhật checklist
const updateChecklist = async (checklistId, newTitle) => {
    try {
        const checklistToUpdate = await Checklist.findByPk(checklistId);

        if (!checklistToUpdate) {
            throw new Error('Checklist not found');
        }

        checklistToUpdate.title = newTitle;
        await checklistToUpdate.save();

        return checklistToUpdate;
    } catch (error) {
        console.error('Error updating checklist:', error);
        throw new Error('Could not update checklist');
    }
};

// Xóa checklist
const deleteChecklist = async (checklistId) => {
    try {
        const checklistToDelete = await Checklist.findByPk(checklistId);

        if (!checklistToDelete) {
            throw new Error('Checklist not found');
        }

        await checklistToDelete.destroy();

        return { message: 'Checklist deleted successfully' };
    } catch (error) {
        console.error('Error deleting checklist:', error);
        throw new Error('Could not delete checklist');
    }
};

module.exports = {
    createChecklist,
    updateChecklist,
    deleteChecklist,
    getChecklistById,
};
