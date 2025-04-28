import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import AdminDashboard from './pages/admin/Dashboard';
import StudentDashboard from './pages/student/Dashboard';
import AdminStudents from './pages/admin/Students';
import AdminExam from './pages/admin/AdminExam';
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path='/admin/students' element={<AdminStudents/>}  />
        <Route path="/admin/exam" element={<AdminExam />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
