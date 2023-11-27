// Configure environment variables
require("dotenv").config();

const express = require("express");
const path = require("path");
const errorHandler = require("./middlewares/handleErrors");
const router = require("./routes/index");

const app = express();
const port = process.env.PORT || 3000;

// Using middleware
app.use(express.static(path.join(__dirname, "statics")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`App listening on port ${port}.`);
});
