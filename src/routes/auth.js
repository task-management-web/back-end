const router = require("express").Router();
const { helloWorld } = require("../controllers/authController");

router.get("/", helloWorld);

module.exports = router;
