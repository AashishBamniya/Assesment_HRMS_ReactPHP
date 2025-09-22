import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './css/Footer.css';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, role, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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

  const getPath = (label) => {
    if (label === 'Home') return '/';
    if (!isLoggedIn) return '/login'; 

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
            <button
              key={index}
              onClick={handleLogout}
              className="nav-item"
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </button>
          );
        }
        return (
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