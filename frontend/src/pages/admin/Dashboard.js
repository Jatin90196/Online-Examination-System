import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminTopBar from '../../components/AdminTopBar';
import AdminSidebar from '../../components/AdminSidebar';

function AdminDashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminId');
        navigate('/');
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f6fa' }}>
          <AdminSidebar onLogout={handleLogout} />
          <div style={{ marginLeft: 220, width: '100%' }}>
            <AdminTopBar adminName="Admin" />
            <div style={{
              padding: '40px 32px',
              maxWidth: 1200,
              margin: '0 auto'
            }}>
              <h1 style={{
                fontSize: '2.2rem',
                fontWeight: 700,
                marginBottom: 12,
                color: '#1976d2'
              }}>Admin Dashboard</h1>
              <p style={{
                fontSize: '1.1rem',
                color: '#444',
                marginBottom: 32
              }}>
                Welcome to the admin dashboard!
              </p>
              {/* Add dashboard widgets/cards here */}
            </div>
          </div>
        </div>
      );
      
}

export default AdminDashboard;
