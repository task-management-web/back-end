const Comment = require("../models/comment");

// Tạo comment mới
const createComment = async (req, res, next) => {
    try {
        const { userId, cardId, content } = req.body;

        const newComment = await Comment.create({
            content,
            UserId: userId,
            CardId: cardId,
        });

        res.status(201).json(newComment);
    } catch (error) {
        console.error("Error creating comment:", error);
        throw new Error("Could not create comment");
    }
};

// Cập nhật nội dung comment
const updateComment = async (req, res, next) => {
    try {
        const { userId, commentId, newContent } = req.body;

        const commentToUpdate = await Comment.findByPk(commentId);

        if (!commentToUpdate) {
            return res.status(404).json({ error: "Comment not found" });
        }

        // Chỉ cho phép người viết comment cập nhật nội dung
        if (commentToUpdate.userId !== userId) {
            return res
                .status(403)
                .json({ error: "You are not allowed to update this comment" });
        }

        commentToUpdate.content = newContent;
        await commentToUpdate.save();

        res.status(200).json(commentToUpdate);
    } catch (error) {
        console.error("Error updating comment:", error);
        return res.status(500).json({ error: "Could not update comment" });
    }
};

// Xóa comment
const deleteComment = async (req, res, next) => {
    try {
        const { userId, commentId } = req.body;

        const commentToDelete = await Comment.findByPk(commentId);

        if (!commentToDelete) {
            return res.status(404).json({ error: "Comment not found" });
        }

        // Chỉ cho phép người viết comment xóa comment của mình
        if (userId !== commentToDelete.userId) {
            return res
                .status(403)
                .json({ error: "You are not allowed to delete this comment" });
        }

        await commentToDelete.destroy();

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        return res.status(500).json({ error: "Could not delete comment" });
    }
};

// Hiển thị comment
const getCommentsByCardId = async (req, res, next) => {
    try {
        const { cardId } = req.params;
        const comments = await Comment.findAll({
            where: { cardId },
        });

        res.status(200).json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        return res.status(500).json({ error: "Could not fetch comments" });
    }
};

module.exports = {
    createComment,
    updateComment,
    deleteComment,
    getCommentsByCardId,
};
