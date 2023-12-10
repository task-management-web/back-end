const express = require("express");
const authRouter = require("./auth");
const boardRouter = require("./board");
const userRouter = require("./user");
const cardRouter = require("./card")
const attachmentRouter = require("./attachment")
const checklistRouter = require("./checklist")
const checklistitemRouter = require("./checklistitem")
const commentRouter = require("./comment")
const labelRouter = require("./label")
const listRouter = require("./list")
const NotFound = require("../errors/NotFound");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/boards", boardRouter);
router.use("/users", userRouter);
router.use("/card", cardRouter);
router.use("/attachment", attachmentRouter)
router.use("/checklist", checklistRouter)
router.use("/checklistitem", checklistitemRouter)
router.use("/label", labelRouter)
router.use("/list", listRouter)
router.use("/comment", commentRouter)

router.use("/", (req, res, next) => {
    next(new NotFound());
});

module.exports = router;
