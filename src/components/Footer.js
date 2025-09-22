import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './css/Footer.css';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, role, logout } = useAuth();

  // Function to handle the logout process
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Dynamically create navigation items based on login state
  const navItems = [
    { label: 'Home', icon: 'fas fa-home' },
    { label: 'EMP', icon: 'fas fa-users' },
  ];

  if (isLoggedIn && role === 'HR') {
    navItems.push({ label: 'HR', icon: 'fas fa-user-tie' });
    navItems.push({ label: 'Logout', icon: 'fas fa-sign-out-alt' });
  } else if (isLoggedIn && role === 'Employee') {
    navItems.push({ label: 'Logout', icon: 'fas fa-sign-out-alt' });
  } else {
    navItems.push({ label: 'HR', icon: 'fas fa-user-tie' });
    navItems.push({ label: 'Login', icon: 'fas fa-sign-in-alt' });
  }

  // Determine the correct path for each navigation item
  const getPath = (label) => {
    if (label === 'Home') return '/';
    // If not logged in, all login-related links point to the login page
    if (!isLoggedIn) return '/login'; 

    // Once logged in, navigate to the correct protected page based on role
    if (role === 'HR') {
      if (label === 'HR') return '/add-employee';
      if (label === 'EMP') return '/manage-employee';
    }
    if (role === 'Employee') {
      if (label === 'EMP') return '/manage-employee';
    }
    return '/';
  };

  return (
    <div className="footer-nav">
      {navItems.map((item, index) => {
        if (item.label === 'Logout') {
          return (
            // Logout is a button to handle the click event
            <button
              key={index}
              onClick={handleLogout}
              className="nav-item" // Apply same styling as links
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </button>
          );
        }
        return (
          // Use Link for navigation
          <Link
            key={index}
            to={getPath(item.label)}
            className={`nav-item ${location.pathname === getPath(item.label) ? 'active' : ''}`}
          >
            <i className={item.icon}></i>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Footer;