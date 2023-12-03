const express = require("express");
const authRouter = require("./auth");
const boardRouter = require("./board");
const userRouter = require("./user");
const NotFound = require("../errors/NotFound");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/boards", boardRouter);
router.use("/users", userRouter);

router.use("/", (req, res, next) => {
    next(new NotFound());
});

module.exports = router;
