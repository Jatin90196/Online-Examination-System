const db = require('../connect');

// Create a new student
exports.createStudent = (data, callback) => {
  const sql = 'INSERT INTO students (username, password, name, email, class, roll_number) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [data.username, data.password, data.name, data.email, data.class, data.roll_number], callback);
};

// Find a student by email
exports.findStudentByEmail = (email, callback) => {
  const sql = 'SELECT * FROM students WHERE email = ?';
  db.query(sql, [email], callback);
};
//finding the id of student 
exports.getStudentById = (id, callback) => {
  const sql = 'SELECT * FROM students WHERE id = ?';
  db.query(sql, [id], callback);
}
