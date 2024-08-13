// Frameworks and libraries
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import routes
const attendanceRoutes = require("./routes/attendanceRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Middleware
const app = express();

// Body parser
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/v1/attendance", attendanceRoutes);
app.use("/api/v1/teachers", teacherRoutes);
app.use("/api/v1/admins", adminRoutes);

// Export app
module.exports = app;
