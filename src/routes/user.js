const express = require("express");
const { verifyToken } = require("../controllers/auth");
const {
    getUser,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/user");

const router = express.Router();

router.post("/", createUser);
router.use("/", verifyToken);
router.get("/", getUser);
router.put("/", updateUser);
router.delete("/", deleteUser);

module.exports = router;
