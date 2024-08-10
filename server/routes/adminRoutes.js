const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.get("/admins", adminController.getAdmins);
router.post("/admins", adminController.addAdmin);
router.put("/admins/:id", adminController.updateAdmin);
router.delete("/admins/:id", adminController.deleteAdmin);

module.exports = router;
