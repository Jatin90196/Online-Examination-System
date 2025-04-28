import express from 'express';
import studentController from '../controllers/studentController.js';

const router = express.Router();

// Student Registration
router.post('/register', studentController.register);

// Student Login
router.post('/login', studentController.login);

// Get Student Profile
router.get('/profile/:id', studentController.profile);

// In routes/student.js
router.get('/', studentController.getAllStudents);


export default router;
