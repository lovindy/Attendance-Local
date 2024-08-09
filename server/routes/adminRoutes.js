const express = require("express");
const {
  getAdmins,
  addAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/admins", getAdmins);
router.post("/admins", addAdmin);
router.put("/admins/:id", updateAdmin);
router.delete("/admins/:id", deleteAdmin);

module.exports = router;
