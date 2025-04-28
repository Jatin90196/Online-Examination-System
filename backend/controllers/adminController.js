import bcrypt from 'bcrypt';
import adminModel from '../models/admin.js';

// Admin Registration
const register = (req, res) => {
  const { password, name, email } = req.body;
  adminModel.findAdminByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (results.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).json({ message: 'Error hashing password' });
      adminModel.createAdmin(
        { password: hash, name, email },
        (err) => {
          if (err) return res.status(500).json({ message: 'Error creating admin' });
          res.json({ message: 'Admin registered successfully' });
        }
      );
    });
  });
};

// Admin Login
const login = (req, res) => {
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
      res.json({ message: 'Admin login successful', id: admin.id });
    });
  });
};

const createExam = (req, res) => {
  const { name, date, duration, instructions  } = req.body;
  adminModel.createExam(
    { name, date, duration, instructions},
    (err) => {
      if (err) return res.status(500).json({ message: 'Error creating exam' });
      res.json({ message: 'Exam created successfully' });
    }
  );
};

export default {
  register,
  login,
  createExam
};
