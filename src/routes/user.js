const router = require("express").Router();
const {
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/user");

router.post("/", createUser);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
