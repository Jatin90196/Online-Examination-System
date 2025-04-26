const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

console.log(adminController);

// Admin Registration
router.post('/register', adminController.register);

// Admin Login
router.post('/login', adminController.login);

module.exports = router;
