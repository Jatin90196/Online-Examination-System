import bcrypt from 'bcrypt';
import studentModel from '../models/student.js';

// Student Registration
const register = (req, res) => {
  const { password, name, email, class: studentClass, roll_number } = req.body;
  studentModel.findStudentByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (results.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).json({ message: 'Error hashing password' });
      studentModel.createStudent(
        { password: hash, name, email, class: studentClass, roll_number },
        (err) => {
          if (err) return res.status(500).json({ message: 'Error creating student' });
          res.json({ message: 'Student registered successfully' });
        }
      );
    });
  });
};

// Student Login (returns ID and name if successful)
const login = (req, res) => {
  const { email, password } = req.body;
  studentModel.findStudentByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (results.length === 0) {
      return res.status(400).json({ message: 'Student not found' });
    }
    const student = results[0];
    bcrypt.compare(password, student.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Error comparing passwords' });
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      res.json({ message: 'Student login successful', id: student.id, name: student.name, email: student.email });
    });
  });
};

// Get Student Profile
const profile = (req, res) => {
  const studentId = req.params.id;
  studentModel.getStudentById(studentId, (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (results.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(results[0]);
  });
};

// Get All Students
const getAllStudents = (req, res) => {
  studentModel.getAll((err, students) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    res.json(students);
  });
};

export default {
  register,
  login,
  profile,
  getAllStudents
};
