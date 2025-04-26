import React from "react";
import './Sidebar.css'

function Sidebar({onLogout}){
    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <span role="img" aria-label="logo">📝</span>
Exam System

            </div>
            <nav className="sidebar-nav">
        <a href="#" className="sidebar-link active">Home</a>
        <a href="#">My Exams</a>
        <a href="#">My Results</a>
        <a href="#">My Profile</a>
        <button className="sidebar-logout" onClick={onLogout}>Logout</button>
      </nav>
        </div>
    )
}

export default Sidebar;