import React from 'react';
import './TopBar.css';

function TopBar({studentName, profilePic}) {

    return (
        <div className='top-bar'>
            <div className='topbar-welcome'>
                Welcome, {studentName}!
            </div>
            <div className='topbar-profile'>
                <img src={profilePic || "https://ui-avatars.com/api/?name=" + encodeURIComponent(studentName)} alt='Profile' className='topbar-profile-pic' />

            </div>
        </div>
    )
    
}

export default TopBar;