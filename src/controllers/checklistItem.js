const ChecklistItem = require("../models/checklistItem");

// Tạo checklist item mới
const createChecklistItem = async (req, res, next) => {
    const { title, dueDate, checked, checklistId } = req.body;

    try {
        const newChecklistItem = await ChecklistItem.create({
            title,
            dueDate,
            checked,
            ChecklistId: checklistId,
        });

        res.status(201).json(newChecklistItem);
    } catch (error) {
        console.error("Error creating checklist item:", error);
        return res
            .status(500)
            .json({ error: "Could not create checklist item" });
    }
};

// Cập nhật checklist item
const updateChecklistItem = async (req, res, next) => {
    const { userId, checklistItemId, newTitle, newDueDate } = req.body;

    try {
        const checklistItemToUpdate = await ChecklistItem.findByPk(
            checklistItemId
        );

        if (!checklistItemToUpdate) {
            return res.status(404).json({ error: "Checklist item not found" });
        }

        // Cập nhật chỉ được áp dụng với người tạo checklist item
        if (userId !== checklistItemToUpdate.userId) {
            throw new Error(
                "You are not allowed to update this checklist item"
            );
        }

        checklistItemToUpdate.title = newTitle;
        checklistItemToUpdate.dueDate = newDueDate;
        await checklistItemToUpdate.save();

        res.status(200).json(checklistItemToUpdate);
    } catch (error) {
        console.error("Error updating checklist item:", error);
        return res
            .status(500)
            .json({ error: "Could not update checklist item" });
    }
};

// Xóa checklist item
const deleteChecklistItem = async (req, res, next) => {
    const { userId, checklistItemId } = req.body;

    try {
        const id = checklistItemId;
        const checklistItemToDelete = await ChecklistItem.findByPk(id);

        if (!checklistItemToDelete) {
            return res.status(404).json({ error: "Checklist item not found" });
        }

        // Xóa chỉ khi người dùng là người tạo checklist item
        if (userId !== checklistItemToDelete.userId) {
            throw new Error(
                "You are not allowed to delete this checklist item"
            );
        }

        await checklistItemToDelete.destroy();

        res.status(200).json({
            message: "Checklist item deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting checklist item:", error);
        return res
            .status(500)
            .json({ error: "Could not delete checklist item" });
    }
};

// Hiển thị checklist item
const getChecklistItemsByChecklistId = async (req, res, next) => {
    const { checklistId } = req.body;

    try {
        const checklistItems = await ChecklistItem.findAll({
            where: { checklistId },
        });

        res.status(200).json(checklistItems);
    } catch (error) {
        console.error("Error fetching checklist items:", error);
        res.status(500).json({ error: "Could not fetch checklist items" });
    }
};

// Cập nhật trạng thái checked cho checklist item
const updateChecklistItemCheckedStatus = async (req, res, next) => {
    const { userId, checklistItemId, newCheckedStatus } = req.body;

    try {
        const id = checklistItemId;
        const checklistItemToUpdate = await ChecklistItem.findByPk(id);

        if (!checklistItemToUpdate) {
            return res.status(404).json({ error: "Checklist item not found" });
        }

        checklistItemToUpdate.checked = newCheckedStatus;
        await checklistItemToUpdate.save();

        res.status(200).json(checklistItemToUpdate);
    } catch (error) {
        console.error("Error updating checklist item:", error);
        res.status(500).json({ error: "Could not update checklist item" });
    }
};

module.exports = {
    createChecklistItem,
    updateChecklistItem,
    deleteChecklistItem,
    getChecklistItemsByChecklistId,
    updateChecklistItemCheckedStatus,
};
