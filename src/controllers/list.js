/** @format */

const List = require('../models/list');

const createNewList = async (req, res, next) => {
	try {
		const newList = await List.create({
			title: req.body.title,
			position: req.body.position,
			boardId: req.body.boardId,
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
const updateList = async (req, res) => {
	try {
		const listId = req.params.id;
		const listToUpdate = await List.findByPk(listId);
		if (!listToUpdate) {
			return res.status(404).json({ error: 'List not found' });
		}

		listToUpdate.title = req.body.title || listToUpdate.title;
		listToUpdate.position = req.body.position || listToUpdate.position;

		await listToUpdate.save();

		res.json({ message: 'List updated successfully', list: listToUpdate });
	} catch (error) {
		console.error('Error updating list:', error);
		res.status(500).json({ error: 'Could not update list' });
	}
};

const getListsByBoardId = async (req, res) => {
	try {
		const lists = await List.findAll({
			where: {
				boardId: req.body.boardId,
			},
		});

		res.json(lists);
	} catch (error) {
		console.error('Error fetching lists by board Id:', error);
		res.status(500).json({ error: 'Could not fetch by board Id' });
	}
};

const getAllLists = async (req, res) => {
	try {
		const allLists = await List.findAll();

		res.json(allLists);
	} catch (error) {
		console.error('Error fetching all lists:', error);
		res.status(500).json({ error: 'Could not fetch all lists' });
	}
};

module.exports = {
	createNewList,
	deleteList,
	updateList,
	getAllLists,
	getListsByBoardId,
};
