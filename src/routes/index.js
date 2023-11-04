const authRouter = require("./auth");
const router = require("express").Router();

router.use("/auth", authRouter);

router.use("/", (req, res) => {
    res.status(404).send("Not found");
});

module.exports = router;
