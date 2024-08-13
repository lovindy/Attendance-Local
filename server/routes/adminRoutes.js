const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.get('/', adminController.getAdmins);
router.post('/', adminController.addAdmin);
router.put('/:id', adminController.updateAdmin);
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;
