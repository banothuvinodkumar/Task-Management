import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import socketService from '../services/socket';

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    socketService.disconnect();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>TaskMgt</h1>
      </div>
      <div className="navbar-user">
        <span>Welcome, {user?.name}</span>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
