const db = require('../connect');

// Create a new admin
exports.createAdmin = (data, callback) => {
  const sql = 'INSERT INTO admins (username, password, name, email) VALUES (?, ?, ?, ?)';
  db.query(sql, [data.username, data.password, data.name, data.email], callback);
};

// Find an admin by email
exports.findAdminByEmail = (email, callback) => {
  const sql = 'SELECT * FROM admins WHERE email = ?';
  db.query(sql, [email], callback);
};

exports.getAdminById = (id, callback) => {
  const sql = 'SELECT * FROM admins WHERE id = ?';
  db.query(sql, [id], callback);
}
