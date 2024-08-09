const { Admin } = require("../models");

// Get all admins
exports.getAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new admin
exports.addAdmin = async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update admin
exports.updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByPk(id);
    if (admin) {
      await admin.update(req.body);
      res.json(admin);
    } else {
      res.status(404).json({ error: "Admin not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete admin
exports.deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByPk(id);
    if (admin) {
      await admin.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Admin not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
