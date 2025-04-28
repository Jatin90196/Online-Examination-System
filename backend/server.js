import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import adminRoutes from './routes/admin.js';
import studentRoutes from './routes/student.js';
import examRoutes from './routes/exam.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/admins', adminRoutes);
app.use('/api/students', studentRoutes); // Assuming you have an exam route
app.use('/api/exams', examRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
