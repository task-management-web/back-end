const ChecklistItem = require('../models/checklistitem');

// Tạo checklist item mới
const createChecklistItem = async (title, checklistId, dueDate, checked) => {
    try {
        const newChecklistItem = await ChecklistItem.create({
            title,
            checklistId,
            dueDate,
            checked,
        });

        return newChecklistItem;
    } catch (error) {
        console.error('Error creating checklist item:', error);
        throw new Error('Could not create checklist item');
    }
};

// Cập nhật checklist item
const updateChecklistItem = async (userId, checklistItemId, newTitle, newDueDate, newChecked) => {
    try {
        const checklistItemToUpdate = await ChecklistItem.findByPk(checklistItemId);

        if (!checklistItemToUpdate) {
            throw new Error('Checklist item not found');
        }

        // Cập nhật chỉ được áp dụng với người tạo checklist item
        if (userId !== checklistItemToUpdate.userId) {
            throw new Error('You are not allowed to update this checklist item');
        }

        checklistItemToUpdate.title = newTitle;
        checklistItemToUpdate.dueDate = newDueDate;
        checklistItemToUpdate.checked = newChecked;
        await checklistItemToUpdate.save();

        return checklistItemToUpdate;
    } catch (error) {
        console.error('Error updating checklist item:', error);
        throw new Error('Could not update checklist item');
    }
};

// Xóa checklist item
const deleteChecklistItem = async (userId, checklistItemId) => {
    try {
        const checklistItemToDelete = await ChecklistItem.findByPk(checklistItemId);

        if (!checklistItemToDelete) {
            throw new Error('Checklist item not found');
        }

        // Xóa chỉ khi người dùng là người tạo checklist item
        if (userId !== checklistItemToDelete.userId) {
            throw new Error('You are not allowed to delete this checklist item');
        }

        await checklistItemToDelete.destroy();

        return { message: 'Checklist item deleted successfully' };
    } catch (error) {
        console.error('Error deleting checklist item:', error);
        throw new Error('Could not delete checklist item');
    }
};

// Hiển thị checklist item
const getChecklistItemsByChecklistId = async (checklistId) => {
    try {
        const checklistItems = await ChecklistItem.findAll({
            where: { checklistId },
        });

        return checklistItems;
    } catch (error) {
        console.error('Error fetching checklist items:', error);
        throw new Error('Could not fetch checklist items');
    }
};




// Cập nhật trạng thái checked cho checklist item
const updateChecklistItemCheckedStatus = async (userId, checklistItemId, newCheckedStatus) => {
    try {
        const checklistItemToUpdate = await ChecklistItem.findByPk(checklistItemId);

        if (!checklistItemToUpdate) {
            throw new Error('Checklist item not found');
        }

        checklistItemToUpdate.checked = newCheckedStatus;
        await checklistItemToUpdate.save();

        return checklistItemToUpdate;
    } catch (error) {
        console.error('Error updating checklist item:', error);
        throw new Error('Could not update checklist item');
    }
};

module.exports = {
    createChecklistItem,
    updateChecklistItem,
    deleteChecklistItem,
    getChecklistItemsByChecklistId,
    updateChecklistItemCheckedStatus,
};
