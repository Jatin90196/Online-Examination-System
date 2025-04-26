const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Student Registration
router.post('/register', studentController.register);

// Student Login
router.post('/login', studentController.login);

router.get('/profile/:id', studentController.profile);


module.exports = router;