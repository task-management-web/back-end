const Checklist = require("../models/checklist");
const ChecklistItem = require("../models/checklistItem");

// Tạo checklist mới
const createChecklist = async (req, res, next) => {
    const { title, cardId } = req.body;

    try {
        const { title, cardId } = req.body;

        const newChecklist = await Checklist.create({
            title,
            CardId: cardId,
        });

        res.status(201).json(newChecklist);
    } catch (error) {
        console.error('Error creating checklist:', error);
        return res.status(500).json({ error: 'Could not create checklist' });
    }
};

// Cập nhật checklist
const updateChecklist = async (req, res, next) => {
    const { checklistId, newTitle } = req.body;

    try {
        const { checklistId, newTitle } = req.body;

        const checklistToUpdate = await Checklist.findByPk(checklistId);

        if (!checklistToUpdate) {
            return res.status(404).json({ error: 'Checklist not found' });
        }

        checklistToUpdate.title = newTitle;
        await checklistToUpdate.save();

        res.status(200).json(checklistToUpdate);
    } catch (error) {
        console.error('Error updating checklist:', error);
        return res.status(500).json({ error: 'Could not update checklist' });
    }
};

// Xóa checklist
const deleteChecklist = async (req, res, next) => {
    const checklistId = req.params.id;

    try {
        const checklistToDelete = await Checklist.findByPk(checklistId);

        if (!checklistToDelete) {
            return res.status(404).json({ error: 'Checklist not found' });
        }

        await ChecklistItem.destroy({
            where: {
                ChecklistId: checklistId,
            },
        });

        await checklistToDelete.destroy();
        
        res.status(200).json({ message: "Checklist deleted successfully" });
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
