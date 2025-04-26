const bcrypt = require('bcrypt');
const adminModel = require('../models/admin');

// Admin Registration
exports.register = (req, res) => {
  const { username, password, name, email } = req.body;
  adminModel.findAdminByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (results.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).json({ message: 'Error hashing password' });
      adminModel.createAdmin(
        { username, password: hash, name, email },
        (err) => {
          if (err) return res.status(500).json({ message: 'Error creating admin' });
          res.json({ message: 'Admin registered successfully' });
        }
      );
    });
  });
};

// Admin Login
exports.login = (req, res) => {
  const { email, password } = req.body;
  adminModel.findAdminByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (results.length === 0) {
      return res.status(400).json({ message: 'Admin not found' });
    }
    const admin = results[0];
    bcrypt.compare(password, admin.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Error comparing passwords' });
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      
      res.json({ message: 'Admin login successful' });
    });
  });
};
