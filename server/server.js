const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/database");
const attendanceRoutes = require("./routes/attendanceRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const adminRoutes = require("./routes/adminRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", attendanceRoutes);
app.use("/api", teacherRoutes);
app.use("/api", adminRoutes);

const PORT = process.env.PORT || 5000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
