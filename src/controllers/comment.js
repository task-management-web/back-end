const Comment = require('../models/comment');


// Tạo comment mới
const createComment = async (userId, cardId, content) => {
    try {
        const newComment = await Comment.create({
            userId,
            cardId,
            content,
        });

        return newComment;
    } catch (error) {
        console.error('Error creating comment:', error);
        throw new Error('Could not create comment');
    }
};

// Cập nhật nội dung comment
const updateComment = async (userId, commentId, newContent) => {
    try {
        const commentToUpdate = await Comment.findByPk(commentId);

        if (!commentToUpdate) {
            throw new Error('Comment not found');
        }

        // Chỉ cho phép người viết comment cập nhật nội dung
        if (commentToUpdate.userId !== userId) {
            throw new Error('You are not allowed to update this comment');
        }

        commentToUpdate.content = newContent;
        await commentToUpdate.save();

        return commentToUpdate;
    } catch (error) {
        console.error('Error updating comment:', error);
        throw new Error('Could not update comment');
    }
};

// Xóa comment
const deleteComment = async (userId, commentId) => {
    try {
        const commentToDelete = await Comment.findByPk(commentId);

        if (!commentToDelete) {
            throw new Error('Comment not found');
        }

        // Chỉ cho phép người viết comment xóa comment của mình
        if (userId !== commentToDelete.userId) {
            throw new Error('You are not allowed to delete this comment');
        }

        await commentToDelete.destroy();

        return { message: 'Comment deleted successfully' };
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw new Error('Could not delete comment');
    }
};
 
// Hiển thị comment
const getCommentsByCardId = async (cardId) => {
    try {
        const comments = await Comment.findAll({
            where: { cardId },
        });

        return comments;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw new Error('Could not fetch comments');
    }
};

module.exports = {
    createComment,
    updateComment,
    deleteComment,
    getCommentsByCardId,
};
