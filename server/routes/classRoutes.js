// Frameworks
const express = require('express');

// Controllers
const classController = require('../controllers/classController');

// Define router for class routes
const router = express.Router();

// Class routes
router.get('/', classController.getClasses);
router.post('/', classController.addClass);
router.put('/:id', classController.updateClass);
router.delete('/:id', classController.deleteClass);

module.exports = router;
