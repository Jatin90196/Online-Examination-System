// controllers/examController.js
import examModel from '../models/exam.js';

export const createExam = (req, res) => {
  const { name, date, duration, instructions, questions } = req.body;

  examModel.createExam({ name, date, duration, instructions }, (err, examId) => {
    if (err) return res.status(500).json({ message: 'Error creating exam' });
    
    examModel.insertQuestions(examId, questions, (err2) => {
      if (err2) return res.status(500).json({ message: 'Error saving questions' });
      res.json({ message: 'Exam and questions saved successfully', examId });
    });
  });
};
