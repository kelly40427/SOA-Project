import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './AdminDashbord.css';
export function AdminDashboard() {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Here you should clear the user's session or token from storage
        console.log("Logging out...");
    
        // Redirect to login page
        navigate('/login');
      };
  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <Link to="/admin/user">Users</Link>
        <Link to="/admin/attraction-order">Attraction Orders</Link>
        <Link to="/admin/hotel-order">Hotel Orders</Link>
        <div className="logout-container">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="content">
        <Outlet /> {/* This is where the nested route components will be rendered */}
      </div>
    </div>
  )
}

export default AdminDashboard