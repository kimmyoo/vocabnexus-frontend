import React from 'react'
import { Link } from "react-router-dom";

const DashHeader = () => {
    return (
        <div className="navbar">
            <div className="logo float-right">VOCAB NEXUS</div>
            <ul className="nav-links">
                <Link to="/user-dash">User Profile</Link>
                <Link to="/user-dash/nodes/add">Quick Add</Link>
                <Link to="logout">Log Out</Link>
            </ul>
        </div>
    );
}

export default DashHeader