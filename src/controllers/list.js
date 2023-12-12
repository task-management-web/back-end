const NotFound = require("../errors/NotFound");
const Card = require("../models/card");
const List = require("../models/list");

const createNewList = async (req, res, next) => {
    try {
        const newList = await List.create({
            title: req.body.title,
            position: req.body.position,
            BoardId: req.body.boardId,
        });

        res.status(201).json(newList);
    } catch (error) {
        console.error("Error creating list:", error);
        throw new Error("Could not create list");
    }
};

const deleteList = async (req, res, next) => {
    try {
        const listId = req.params.id;

        const listToDelete = await List.findByPk(listId);

        if (!listToDelete) {
            return res.status(404).json({ error: "List not found" });
        }

        await listToDelete.destroy();

        res.status(200).json({ message: "List deleted successfully" });
    } catch (error) {
        console.error("Error deleting list:", error);
        res.status(500).json({ error: "Could not delete list" });
    }
};

const updateList = async (req, res, next) => {
    try {
        const listId = req.params.id;

        const listToUpdate = await List.findByPk(listId);

        if (!listToUpdate) {
            return res.status(404).json({ error: "List not found" });
        }

        listToUpdate.title = req.body.title || listToUpdate.title;

        listToUpdate.position = req.body.position || listToUpdate.position;

        await listToUpdate.save();

        res.status(200).json({
            message: "List updated successfully",
            list: listToUpdate,
        });
    } catch (error) {
        console.error("Error updating list:", error);
        res.status(500).json({ error: "Could not update list" });
    }
};

const getAllLists = async (req, res, next) => {
    try {
        const allLists = await List.findAll();

        res.status(200).json(allLists);
    } catch (error) {
        console.error("Error fetching all lists:", error);
        res.status(500).json({ error: "Could not fetch all lists" });
    }
};

const getListById = async (req, res, next) => {
    const listId = req.params.id;

    try {
        const list = await List.findOne({
            where: {
                id: listId,
            },
            include: {
                model: Card,
                as: "cards",
                attributes: {
                    exclude: ["ListId"],
                },
                where: {
                    closed: false,
                },
                required: false,
            },
        });

        if (!list) {
            throw new NotFound();
        }

        res.status(200).json(list);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createNewList,
    deleteList,
    updateList,
    getAllLists,
    getListById,
};
