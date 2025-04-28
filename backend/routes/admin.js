import express from 'express';
import adminController from '../controllers/adminController.js';

const router = express.Router();

router.post('/register', adminController.register);
router.post('/login', adminController.login);
router.post('/exams', adminController.createExam);

export default router;
