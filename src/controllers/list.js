const List = require('../models/list');



const createNewList = async (req, res, next) => {
    try {
        const newList = await List.create({
            title: req.body.title,
            position: req.body.position,
        });

        res.json(newList);
    } catch (error) {
        console.error('Error creating list:', error);
        throw new Error('Could not create list');
    }
};


const deleteList = async (req, res) => {
    try {
        const listId = req.params.id;
        const listToDelete = await List.findByPk(listId);
        if (!listToDelete) {
            return res.status(404).json({ error: 'List not found' });
        }
        await listToDelete.destroy();

        res.json({ message: 'List deleted successfully' });
    } catch (error) {
        console.error('Error deleting list:', error);
        res.status(500).json({ error: 'Could not delete list' });
    }
};

 

module.exports = {
    createNewList, deleteList
}