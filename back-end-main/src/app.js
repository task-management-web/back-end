// Cấu hình biến môi trường
require("dotenv").config();

const express = require("express");
const path = require("path");
const errorHandler = require("./middlewares/handleErrors");
const router = require("./routes/index");

const app = express();
const port = process.env.PORT || 3000;

// Sử dụng middleware
app.use(express.static(path.join(__dirname, "statics")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.use(errorHandler);

const List = require("./models/list");
const Activity = require("./models/activity")
const Cardlabel = require("./models/card_laber")
const CardMember = require("./models/card_member")
const Checklist = require("./models/checklist")
const Label = require("./models/label")


app.listen(port, () => {
    console.log(`App listening on port ${port}.`);
});
