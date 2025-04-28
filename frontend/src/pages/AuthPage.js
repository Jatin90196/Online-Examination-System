import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

function AuthPage() {
  const [role, setRole] = useState(null);
  const [formType, setFormType] = useState('login');
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const endpoint =
      role === 'student'
        ? 'http://localhost:5000/api/students/' + formType
        : 'http://localhost:5000/api/admins/' + formType;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(result.message || 'Success!');
        if (formType === 'login') {
          if (role === 'admin') {
            localStorage.setItem('adminId', result.id);
            navigate('/admin/dashboard');
          } else if (role === 'student') {
            localStorage.setItem('studentId', result.id);
            navigate('/student/dashboard');
          }
        }
      } else {
        setMessage(result.message || 'Error!');
      }
    } catch (err) {
      setMessage('Network error');
    }
  };

  const renderFormFields = () => {
    if (!role) return null;
    return (
      <>
        {formType === 'register' && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        {role === 'student' && formType === 'register' && (
          <>
            <input
              type="text"
              name="class"
              placeholder="Class"
              onChange={handleChange}
            />
            <input
              type="text"
              name="roll_number"
              placeholder="Roll Number"
              onChange={handleChange}
            />
          </>
        )}
      </>
    );
  };

  return (
    <div className="auth-container">
      {!role ? (
        <div>
          <h2>Are you a </h2>
          <button onClick={() => { setRole('student'); setFormType('login'); }}>Student</button>
          <button onClick={() => { setRole('admin'); setFormType('login'); }}>Admin</button>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: 10 }}>
            <button
              onClick={() => setFormType('login')}
              style={{ fontWeight: formType === 'login' ? 'bold' : 'normal' }}
            >
              Login
            </button>
            <button
              onClick={() => setFormType('register')}
              style={{ fontWeight: formType === 'register' ? 'bold' : 'normal' }}
            >
              Register
            </button>
            <button onClick={() => setRole(null)} style={{ float: 'right' }}>
              Change Role
            </button>
          </div>
          <h2>
            {role.charAt(0).toUpperCase() + role.slice(1)} {formType}
          </h2>
          <form onSubmit={handleSubmit}>
            {renderFormFields()}
            <button type="submit" style={{ marginTop: 10 }}>
              {formType.charAt(0).toUpperCase() + formType.slice(1)}
            </button>
            {formType === 'login' && (
              <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <span>Don't have an account? </span>
                <button
                  type="button"
                  style={{
                    background: 'none',
                    color: '#1976d2',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    fontSize: '1rem'
                  }}
                  onClick={() => setFormType('register')}
                >
                  Create new user
                </button>
              </div>
            )}
            {formType === 'register' && (
              <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <span>Already have an account? </span>
                <button
                  type="button"
                  style={{
                    background: 'none',
                    color: '#1976d2',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    fontSize: '1rem'
                  }}
                  onClick={() => setFormType('login')}
                >
                  Login
                </button>
              </div>
            )}
          </form>
          {message && <div className="message">{message}</div>}
        </div>
      )}
    </div>
  );
}

export default AuthPage;
