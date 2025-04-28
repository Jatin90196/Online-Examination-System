import React from "react";
import { NavLink } from "react-router-dom";
import './AdminSidebar.css';

function AdminSidebar({ onLogout }) {
    return (
        <div className="sidebar">
            <nav className="sidebar-nav">
                <NavLink 
                    to="/admin/dashboard" 
                    className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"}
                >
                    Dashboard
                </NavLink>
                <NavLink 
                    to="/admin/students" 
                    className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"}
                >
                    Students
                </NavLink>
                <NavLink 
                    to="/admin/exam" 
                    className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"}
                >
                    Exam
                </NavLink>
                <NavLink 
                    to="/admin/result" 
                    className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"}
                >
                    Results
                </NavLink>
                <button className="sidebar-logout" onClick={onLogout}>Logout</button>
            </nav>
        </div>
    );
}

export default AdminSidebar;
