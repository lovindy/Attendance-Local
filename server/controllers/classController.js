const { Class } = require("../models");

// Get all classes
exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.findAll();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new class
exports.addClass = async (req, res) => {
  try {
    const newClass = await Class.create(req.body);
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update class
exports.updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const existingClass = await Class.findByPk(id);
    if (existingClass) {
      await existingClass.update(req.body);
      res.json(existingClass);
    } else {
      res.status(404).json({ error: "Class not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete class
exports.deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    const existingClass = await Class.findByPk(id);
    if (existingClass) {
      await existingClass.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Class not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
