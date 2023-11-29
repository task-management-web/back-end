const express = require("express");
const { verifyToken } = require("../controllers/auth");
const {
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/user");

const router = express.Router();

router.post("/", createUser);
router.route("/:id").get(verifyToken, getUserById).put(verifyToken, updateUser).delete(verifyToken, deleteUser);

module.exports = router;
