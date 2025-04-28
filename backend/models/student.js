import db from '../connect.js';

// Create a new student
const createStudent = (data, callback) => {
  const sql = 'INSERT INTO students (password, name, email, class, roll_number) VALUES (?,  ?, ?, ?, ?)';
  db.query(sql, [data.password, data.name, data.email, data.class, data.roll_number], callback);
};

// Find a student by email
const findStudentByEmail = (email, callback) => {
  const sql = 'SELECT * FROM students WHERE email = ?';
  db.query(sql, [email], callback);
};

// Finding the id of student 
const getStudentById = (id, callback) => {
  const sql = 'SELECT * FROM students WHERE id = ?';
  db.query(sql, [id], callback);
};

const getAll = (callback) => {
  db.query('SELECT id, name, email, class, roll_number FROM students', callback);
};

export default {
  createStudent,
  findStudentByEmail,
  getStudentById,
  getAll
};
