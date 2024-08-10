// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const attendanceRoutes = require("./routes/attendanceRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", attendanceRoutes);
app.use("/api", teacherRoutes);
app.use("/api", adminRoutes);

module.exports = app;
