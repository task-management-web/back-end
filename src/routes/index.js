const authRouter = require("./auth");
const userRouter = require("./user");
const router = require("express").Router();

router.get("/", (req, res) => {
    res.redirect("/auth/login");
});

router.use("/auth", authRouter);
router.use("/users", userRouter);

router.use("/", (req, res) => {
    res.send("Hello");
});

module.exports = router;
