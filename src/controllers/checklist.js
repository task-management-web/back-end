const Checklist = require("../models/checklist");

// Tạo checklist mới
const createChecklist = async (req, res, next) => {
    const { title, cardId } = req.body;

    try {
        const newChecklist = await Checklist.create({
            title,
            CardId: cardId,
        });

        res.status(201).json(newChecklist);
    } catch (error) {
        console.error("Error creating checklist:", error);
        throw new Error("Could not create checklist");
    }
};

// Cập nhật checklist
const updateChecklist = async (req, res, next) => {
    const { checklistId, newTitle } = req.body;

    try {
        const checklistToUpdate = await Checklist.findByPk(checklistId);

        if (!checklistToUpdate) {
            throw new Error("Checklist not found");
        }

        checklistToUpdate.title = newTitle;
        await checklistToUpdate.save();

        res.status(200).json(checklistToUpdate);
    } catch (error) {
        console.error("Error updating checklist:", error);
        throw new Error("Could not update checklist");
    }
};

// Xóa checklist
const deleteChecklist = async (req, res, next) => {
    const { checklistId } = req.body;
    try {
        const checklistToDelete = await Checklist.findByPk(checklistId);

        if (!checklistToDelete) {
            throw new Error("Checklist not found");
        }

        await checklistToDelete.destroy();

        res.status(200).json({ message: "Checklist deleted successfully" });
    } catch (error) {
        console.error("Error deleting checklist:", error);
        throw new Error("Could not delete checklist");
    }
};

module.exports = {
    createChecklist,
    updateChecklist,
    deleteChecklist,
};
