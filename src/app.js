// Cấu hình biến môi trường
require("dotenv").config();

// Kết nối cơ sở dữ liệu
require("./configs/connectDb");

const express = require("express");
const path = require("path");
const router = require("./routes/index");

const app = express();
const port = process.env.PORT || 3000;

// Sử dụng middleware
app.use(express.static(path.join(__dirname, "statics")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(port, () => {
    console.log(`App listening on port ${port}.`);
});
