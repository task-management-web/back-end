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
router.use("/:id", verifyToken);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
