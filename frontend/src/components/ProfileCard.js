import React from 'react';
import './ProfileCard.css';

function ProfileCard({ name, email, className, rollNumber, profilePic, onEdit }) {
  return (
    <div className="profile-card">
      <div className="profile-card-top">
        <img
          src={profilePic || "https://ui-avatars.com/api/?name=" + encodeURIComponent(name)}
          alt="Profile"
          className="profile-card-img"
        />
      </div>
      <div className="profile-card-body">
        <h2 className="profile-card-title">{name}</h2>
        <p className="profile-card-info"><strong>Email:</strong> {email}</p>
        <p className="profile-card-info"><strong>Class:</strong> {className}</p>
        <p className="profile-card-info"><strong>Roll Number:</strong> {rollNumber}</p>
        {onEdit && (
          <button className="profile-card-edit" onClick={onEdit}>Edit Profile</button>
        )}
      </div>
    </div>
  );
}

export default ProfileCard;
