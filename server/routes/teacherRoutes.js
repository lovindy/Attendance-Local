const express = require('express');
const teacherController = require('../controllers/teacherController');

const router = express.Router();

router.get('/', teacherController.getTeachers);
router.post('/', teacherController.addTeacher);
router.put('/:id', teacherController.updateTeacher);
router.delete('/:id', teacherController.deleteTeacher);

module.exports = router;
