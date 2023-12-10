const Activity = require('../models/activity');

// Hàm tạo một hoạt động mới
const createActivity = async (req, res) => {
    const { userId, cardId, content } = req.body;

    try {
        const newActivity = await Activity.create({
            userId,
            cardId,
            content,
        });

        res.json(newActivity);
    } catch (error) {
        console.error('Error creating activity:', error);
        res.status(500).json({ error: 'Could not create activity' });
    }
};

// lấy tất cả hoạt động theo cardId
const getActivitiesByCardId = async (req, res) => {
    const { cardId } = req.params;

    try {
        const activities = await Activity.findAll({
            where: { cardId },
        });

        res.json(activities);
    } catch (error) {
        console.error('Error fetching activities by cardId:', error);
        res.status(500).json({ error: 'Could not fetch activities by cardId' });
    }
};

module.exports = {
    getActivitiesByCardId, createActivity,
};
