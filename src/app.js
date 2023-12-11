// Configure environment variables
require("dotenv").config();

// Connect to the database and initialize tables
require("./models/index");

const cors = require("cors");
const errorHandler = require("./middlewares/handleErrors");
const express = require("express");
const path = require("path");
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

app.listen(port, () => {
    console.log(`App listening on port ${port}.`);
});
