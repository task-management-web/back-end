/** @format */

const express = require('express');
const {
	createNewList,
	deleteList,
	updateList,
	getAllLists,
	getListsByBoardId,
} = require('../controllers/list');

const router = express.Router();

router.post('/create', createNewList);
router.post('/getListsByBoardId', getListsByBoardId);
router.put('/update', updateList);
router.delete('/delete', deleteList);
router.get('/showalllist', getAllLists);

module.exports = router;
