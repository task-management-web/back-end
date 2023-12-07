const Activity = require('../models/activity');

// Hàm tạo một hoạt động mới
const createActivity = async (userId, cardId, content) => {
    try {
        const newActivity = await Activity.create({
            userId: userId,
            cardId: cardId,
            content: content,
        });

        return newActivity;
    } catch (error) {
        console.error('Error creating activity:', error);
        throw new Error('Could not create activity');
    }
};

// lấy tất cả hoạt động theo cardId
const getActivitiesByCardId = async (cardId) => {
    try {
        const activities = await Activity.findAll({
            where: {
                cardId: cardId,
            },
        });

        return activities;
    } catch (error) {
        console.error('Error fetching activities by cardId:', error);
        throw new Error('Could not fetch activities by cardId');
    }
};

module.exports = {
    getActivitiesByCardId, createActivity,
};
