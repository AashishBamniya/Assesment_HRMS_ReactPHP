import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaUsers, FaUserTie, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import './css/Footer.css';

const Footer = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <footer className="footer">
      <nav className="footer-nav">
        {/* NavLink automatically adds 'active' class when path matches */}
        <NavLink 
          to="/" 
        >
          <FaHome className="footer-icon" />
          <span className="footer-text">Home</span>
        </NavLink>

        <NavLink 
          to="/manage-employee" 
        >
          <FaUsers className="footer-icon" />
          <span className="footer-text">EMP</span>
        </NavLink>

        <NavLink 
          to="/add-employee" 
        >
          <FaUserTie className="footer-icon" />
          <span className="footer-text">HR</span>
        </NavLink>

        {isLoggedIn ? (
          // Logout button should not be a NavLink as it doesn't navigate to a new page
          <a href="#" onClick={logout}>
            <FaSignOutAlt className="footer-icon" />
            <span className="footer-text">Logout</span>
          </a>
        ) : (
          <NavLink 
            to="/login" 
          >
            <FaSignInAlt className="footer-icon" />
            <span className="footer-text">Login</span>
          </NavLink>
        )}
      </nav>
    </footer>
  );
};

export default Footer;