const Label = require('../models/label');

// Tạo label mới
const createLabel = async (req, res) => {
    try {
        const { title, color } = req.body;

        const newLabel = await Label.create({
            title,
            color,
        });

        return res.json(newLabel);
    } catch (error) {
        console.error('Error creating label:', error);
        return res.status(500).json({ error: 'Could not create label' });
    }
};


// Cập nhật label
const updateLabel = async (req, res) => {
    try {
        const { labelId, newTitle, newColor } = req.body;

        const labelToUpdate = await Label.findByPk(labelId);

        if (!labelToUpdate) {
            return res.status(404).json({ error: 'Label not found' });
        }

        labelToUpdate.title = newTitle;
        labelToUpdate.color = newColor;
        await labelToUpdate.save();

        return res.json(labelToUpdate);
    } catch (error) {
        console.error('Error updating label:', error);
        return res.status(500).json({ error: 'Could not update label' });
    }
};


// Xóa label
const deleteLabel = async (req, res) => {
    try {
        const { labelId } = req.body;

        const labelToDelete = await Label.findByPk(labelId);

        if (!labelToDelete) {
            return res.status(404).json({ error: 'Label not found' });
        }

        await labelToDelete.destroy();

        return res.json({ message: 'Label deleted successfully' });
    } catch (error) {
        console.error('Error deleting label:', error);
        return res.status(500).json({ error: 'Could not delete label' });
    }
};


// Hiển thị thông tin label
const getAllLabels = async () => {
    try {
        const labels = await Label.findAll({
            where: {
                color: 'red'
            }
        });
        return labels;
    } catch (error) {
        console.error('Error fetching labels by color:', error);
        throw new Error('Could not fetch labels by color');
    }
};



module.exports = {
    createLabel,
    updateLabel,
    deleteLabel,
    getAllLabels,
};
