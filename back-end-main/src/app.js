// Configure environment variables
require("dotenv").config();

// Connect to the database and initialize tables
require("./models/index");

const cors = require("cors");
const express = require("express");
const path = require("path");
const errorHandler = require("./middlewares/handleErrors");
const router = require("./routes/index");

const app = express();
const port = process.env.PORT || 3000;

// Using middleware
app.use(cors());
app.use(express.static(path.join(__dirname, "statics")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);
app.use(errorHandler);


const List = require("./models/list");
const Activity = require("./models/activity")
const Cardlabel = require("./models/card_laber")
const CardMember = require("./models/card_member")
const Checklist = require("./models/check_list")
const Label = require("./models/label")
const Card = require("./models/card")
const Attachment = require("./models/attachment")
const Checklistitem = require("./models/check_list_item")
const Comment = require("./models/comment")


app.listen(port, () => {
    console.log(`App listening on port ${port}.`);
});
