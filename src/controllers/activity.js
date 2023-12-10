const Activity = require("../models/activity");

// Hàm tạo một hoạt động mới
const createActivity = async (req, res, next) => {
    const { userId, cardId, content } = req.body;

    try {
        const newActivity = await Activity.create({
            userId,
            cardId,
            content,
        });

        res.status(201).json(newActivity);
    } catch (error) {
        console.error("Error creating activity:", error);
        throw new Error("Could not create activity");
    }
};

// lấy tất cả hoạt động theo cardId
const getActivitiesByCardId = async (req, res) => {
    const { cardId } = req.params;

    try {
        const activities = await Activity.findAll({
            where: { cardId },
        });

        res.status(200).json(activities);
    } catch (error) {
        console.error("Error fetching activities by cardId:", error);
        throw new Error("Could not fetch activities by cardId");
    }
};

module.exports = {
    getActivitiesByCardId,
    createActivity,
};
