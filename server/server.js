// server.js
const sequelize = require("./config/database");
const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

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
