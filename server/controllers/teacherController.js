const { Teacher } = require("../models");

// Get all teachers
exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.findAll();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new teacher
exports.addTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.create(req.body);
    res.status(201).json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update teacher
exports.updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findByPk(id);
    if (teacher) {
      await teacher.update(req.body);
      res.json(teacher);
    } else {
      res.status(404).json({ error: "Teacher not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete teacher
exports.deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findByPk(id);
    if (teacher) {
      await teacher.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Teacher not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
