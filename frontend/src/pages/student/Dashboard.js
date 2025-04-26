import React, { useEffect, useState } from 'react';
import TopBar from '../../components/TopBar';
import Sidebar from '../../components/Sidebar';
import ProfileCard from '../../components/ProfileCard';

function StudentDashboard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const studentId = localStorage.getItem('studentId'); // Correct key!
    if (!studentId) return;
    fetch(`http://localhost:5000/api/students/profile/${studentId}`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error('Error fetching profile:', err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('studentId');
    window.location.href = '/'; // or use navigate('/') if using react-router
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f6fa' }}>
      <Sidebar onLogout={handleLogout} />
      <div style={{ marginLeft: 210, width: '100%' }}>
        <TopBar
          studentName={profile ? profile.name : "Student"}
          profilePic={profile ? profile.picUrl : ""}
        />
        <div style={{ padding: '302px' }}>
          {/* <h2>Welcome, {profile ? profile.name : "Student"}!</h2> */}
          {/* Profile Card */}
          {profile && (
            <ProfileCard
              name={profile.name}
              email={profile.email}
              className={profile.class}
              rollNumber={profile.roll_number}
              profilePic={profile.picUrl}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
