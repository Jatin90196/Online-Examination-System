import React from "react";
import './AdminTopBar.css';

function AdminTopBar({ adminName }) {
  return (
    <div className="topbar">
      <div className="topbar-welcome">
        Welcome, {adminName ? adminName : "Admin"}!
      </div>
    </div>
  );
}

export default AdminTopBar;
