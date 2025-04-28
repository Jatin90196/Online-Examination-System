import db from '../connect.js';

// Create a new admin
const createAdmin = (data, callback) => {
  const sql = 'INSERT INTO admins ( password, name, email) VALUES ( ?, ?, ?)';
  db.query(sql, [ data.password, data.name, data.email], callback);
};

// Find an admin by email
const findAdminByEmail = (email, callback) => {
  const sql = 'SELECT * FROM admins WHERE email = ?';
  db.query(sql, [email], callback);
};

const getAdminById = (id, callback) => {
  const sql = 'SELECT * FROM admins WHERE id = ?';
  db.query(sql, [id], callback);
};

// const createExam = (data, callback) => {
//   const sql = 'INSERT INTO exams ( name, date, duration, instructions) VALUES (?, ?, ?, ?)';
//   db.query(sql, [data.name, data.date, data.duration, data.instructions], callback);
// };

export default {
  createAdmin,
  findAdminByEmail,
  getAdminById,
  // createExam
};
