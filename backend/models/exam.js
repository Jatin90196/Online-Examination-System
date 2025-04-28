
import db from '../connect.js';

const createExam = (data, callback) => {
  const sql = 'INSERT INTO exams (name, date, duration, instructions) VALUES (?, ?, ?, ?)';
  db.query(sql, [data.name, data.date, data.duration, data.instructions], (err, result) => {
    if (err) return callback(err);
    callback(null, result.insertId); // examId
  });
};

const insertQuestions = (examId, questions, callback) => {
  if (!questions || !questions.length) return callback(null);
  const sql = 'INSERT INTO questions (exam_id, question_text, type, options, correct_answer, marks) VALUES ?';
  const values = questions.map(q => [
    examId,
    q.question_text,
    q.type,
    q.options ? JSON.stringify(q.options) : null,
    q.correct_answer,
    q.marks
  ]);
  db.query(sql, [values], callback);
};

export default { createExam, insertQuestions };
