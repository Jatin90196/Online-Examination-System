
// Student Registration
exports.register = (req, res) => {
  const { username, password, name, email, class: studentClass, roll_number } = req.body;
  studentModel.findStudentByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (results.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).json({ message: 'Error hashing password' });
      studentModel.createStudent(
        { username, password: hash, name, email, class: studentClass, roll_number },
        (err) => {
          if (err) return res.status(500).json({ message: 'Error creating student' });
          res.json({ message: 'Student registered successfully' });
        }
      );
    });
  });
};

// Student Login
const bcrypt = require('bcrypt');
const studentModel = require('../models/student');

// Student Login (returns ID and name if successful)
exports.login = (req, res) => {
  const { email, password } = req.body;
  studentModel.findStudentByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (results.length === 0) {
      return res.status(400).json({ message: 'Student not found' });
    }
    const student = results[0];
    // If you use bcrypt:
    bcrypt.compare(password, student.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Error comparing passwords' });
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      // Return student id and name (add more fields if needed)
      res.json({ message: 'Student login successful', id: student.id, name: student.name, email: student.email });
    });
    // If you store plain text passwords (not recommended), just compare:
    // if (password !== student.password) return res.status(400).json({ message: 'Invalid credentials' });
  });
};


exports.profile = (req, res) => {
  const studentId = req.params.id;
  studentModel.getStudentById(studentId, (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (results.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(results[0]);
  });
};
