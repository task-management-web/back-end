const Checklist = require('../models/check_list');

// Tạo checklist mới
const createChecklist = async (req, res) => {
    try {
        const { title, cardId } = req.body;

        const newChecklist = await Checklist.create({
            title,
            cardId,
        });

        return res.json(newChecklist);
    } catch (error) {
        console.error('Error creating checklist:', error);
        return res.status(500).json({ error: 'Could not create checklist' });
    }
};

// Cập nhật checklist
const updateChecklist = async (req, res) => {
    try {
        const { checklistId, newTitle } = req.body;

        const checklistToUpdate = await Checklist.findByPk(checklistId);

        if (!checklistToUpdate) {
            return res.status(404).json({ error: 'Checklist not found' });
        }

        checklistToUpdate.title = newTitle;
        await checklistToUpdate.save();

        return res.json(checklistToUpdate);
    } catch (error) {
        console.error('Error updating checklist:', error);
        return res.status(500).json({ error: 'Could not update checklist' });
    }
};


// Xóa checklist
const deleteChecklist = async (req, res) => {
    try {
        const { checklistId } = req.body;

        const checklistToDelete = await Checklist.findByPk(checklistId);

        if (!checklistToDelete) {
            return res.status(404).json({ error: 'Checklist not found' });
        }

        await checklistToDelete.destroy();

        return res.json({ message: 'Checklist deleted successfully' });
    } catch (error) {
        console.error('Error deleting checklist:', error);
        return res.status(500).json({ error: 'Could not delete checklist' });
    }
};

// Hiển thị tất cả checklist
const showChecklistsByCardId = async (req, res) => {
    try {
        const { cardId } = req.params;

        const checklists = await Checklist.findAll({
            where: {
                cardId: cardId
            }
        });

        return res.json(checklists);
    } catch (error) {
        console.error('Error fetching checklists:', error);
        return res.status(500).json({ error: 'Could not fetch checklists' });
    }
};


module.exports = {
    createChecklist,
    updateChecklist,
    deleteChecklist,
    showChecklistsByCardId
};
