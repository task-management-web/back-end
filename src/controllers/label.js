const CardLabel = require("../models/cardLabel");
const Label = require("../models/label");

// Tạo label mới
const createLabel = async (req, res, next) => {
    try {
        const { title, color, boardId } = req.body;

        const newLabel = await Label.create({
            title,
            color,
            BoardId: boardId,
        });

        res.status(201).json(newLabel);
    } catch (error) {
        console.error("Error creating label:", error);
        return res.status(500).json({ error: "Could not create label" });
    }
};

// Cập nhật label
const updateLabel = async (req, res, next) => {
    try {
        const { labelId, newTitle, newColor } = req.body;

        const labelToUpdate = await Label.findByPk(labelId);

        if (!labelToUpdate) {
            return res.status(404).json({ error: "Label not found" });
        }

        labelToUpdate.title = newTitle;
        labelToUpdate.color = newColor;
        await labelToUpdate.save();

        res.status(200).json(labelToUpdate);
    } catch (error) {
        console.error("Error updating label:", error);
        return res.status(500).json({ error: "Could not update label" });
    }
};

// Xóa label
const deleteLabel = async (req, res, next) => {
    try {
        const id = req.params.id;

        const labelToDelete = await Label.findByPk(id);

        if (!labelToDelete) {
            return res.status(404).json({ error: "Label not found" });
        }

        await CardLabel.destroy({
            where: {
                LabelId: id,
            },
        });

        await labelToDelete.destroy();

        res.status(200).json({ message: "Label deleted successfully" });
    } catch (error) {
        console.error("Error deleting label:", error);
        return res.status(500).json({ error: "Could not delete label" });
    }
};

// Hiển thị thông tin label
const getAllLabels = async (req, res, next) => {
    try {
        const labels = await Label.findAll();
        res.status(200).json(labels);
    } catch (error) {
        console.error("Error fetching labels:", error);
        res.status(500).json({ error: "Could not fetch labels" });
    }
};

module.exports = {
    createLabel,
    updateLabel,
    deleteLabel,
    getAllLabels,
};
