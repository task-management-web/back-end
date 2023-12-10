const ChecklistItem = require('../models/check_list_item');

// Tạo checklist item mới
const createChecklistItem = async (req, res) => {
    try {
        const { title, checklistId, dueDate, checked } = req.body;

        const newChecklistItem = await ChecklistItem.create({
            title,
            checklistId,
            dueDate,
            checked,
        });

        return res.json(newChecklistItem);
    } catch (error) {
        console.error('Error creating checklist item:', error);
        return res.status(500).json({ error: 'Could not create checklist item' });
    }
};


// Cập nhật checklist item
const updateChecklistItem = async (req, res) => {
    try {
        const { checklistItemId, newTitle, newDueDate } = req.body;

        const checklistItemToUpdate = await ChecklistItem.findByPk(checklistItemId);

        if (!checklistItemToUpdate) {
            return res.status(404).json({ error: 'Checklist item not found' });
        }

        checklistItemToUpdate.title = newTitle;
        checklistItemToUpdate.dueDate = newDueDate;
        await checklistItemToUpdate.save();

        return res.json(checklistItemToUpdate);
    } catch (error) {
        console.error('Error updating checklist item:', error);
        return res.status(500).json({ error: 'Could not update checklist item' });
    }
};


// Xóa checklist item
const deleteChecklistItem = async (req, res) => {
    try {
        const {  checklistItemId } = req.body;

        const checklistItemToDelete = await ChecklistItem.findByPk(checklistItemId);

        if (!checklistItemToDelete) {
            return res.status(404).json({ error: 'Checklist item not found' });
        }

      

        await checklistItemToDelete.destroy();

        return res.json({ message: 'Checklist item deleted successfully' });
    } catch (error) {
        console.error('Error deleting checklist item:', error);
        return res.status(500).json({ error: 'Could not delete checklist item' });
    }
};


// Hiển thị checklist item
const getChecklistItemsByChecklistId = async (req, res) => {
    const { checklistId } = req.params;

    try {
        const checklistItems = await ChecklistItem.findAll({
            where: { checklistId },
        });

        res.json(checklistItems);
    } catch (error) {
        console.error('Error fetching checklist items:', error);
        res.status(500).json({ error: 'Could not fetch checklist items' });
    }
};



// Cập nhật trạng thái checked cho checklist item
const updateChecklistItemCheckedStatus = async (req, res) => {
    const { checklistItemId } = req.params;
    const { newCheckedStatus } = req.body;

    try {
        const id = checklistItemId;
        const checklistItemToUpdate = await ChecklistItem.findByPk(id);

        if (!checklistItemToUpdate) {
            return res.status(404).json({ error: 'Checklist item not found' });
        }

        checklistItemToUpdate.checked = newCheckedStatus;
        await checklistItemToUpdate.save();

        res.json(checklistItemToUpdate);
    } catch (error) {
        console.error('Error updating checklist item:', error);
        res.status(500).json({ error: 'Could not update checklist item' });
    }
};

module.exports = {
    createChecklistItem,
    updateChecklistItem,
    deleteChecklistItem,
    getChecklistItemsByChecklistId,
    updateChecklistItemCheckedStatus,
};
