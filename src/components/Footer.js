import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaUsers, FaUserTie, FaSignInAlt, FaSignOutAlt, FaTasks, FaClipboardCheck } from 'react-icons/fa';
import './css/Footer.css';

const Footer = () => {
    const { isLoggedIn, logout, role } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleRefresh = () => {
        window.location.reload();
    };

    const isCurrentPath = (path) => location.pathname === path;

    return (
        <footer className="footer">
            <nav className="footer-nav">
                {/* Home Icon (always visible) */}
                <NavLink to="/">
                    <FaHome className="footer-icon" />
                    <span className="footer-text">Home</span>
                </NavLink>

                {isLoggedIn ? (
                    <>
                        {/* Second icon: Routes to AddEmployeePage */}
                        <NavLink 
                            to="/add-employee"
                            className={isCurrentPath('/add-employee') ? 'active' : ''}
                        >
                            <FaUsers className="footer-icon" />
                            <span className="footer-text">Add Emp</span>
                        </NavLink>

                        {/* Third icon: Manage Employee */}
                        <NavLink 
                            to="/manage-employee"
                            className={isCurrentPath('/manage-employee') ? 'active' : ''}
                        >
                            <FaTasks className="footer-icon" />
                            <span className="footer-text">Manage</span>
                        </NavLink>

                        {/* Fourth icon: Approval (Only for HR role) */}
                        {role === 'HR' && (
                            <NavLink 
                                to="/approval"
                                className={isCurrentPath('/approval') ? 'active' : ''}
                            >
                                <FaClipboardCheck className="footer-icon" />
                                <span className="footer-text">Approval</span>
                            </NavLink>
                        )}

                        {/* Logout button */}
                        <a href="#" onClick={logout}>
                            <FaSignOutAlt className="footer-icon" />
                            <span className="footer-text">Logout</span>
                        </a>
                    </>
                ) : (
                    <>
                        {/* Links for Logged-Out users */}
                        <NavLink to="/manage-employee">
                            <FaUsers className="footer-icon" />
                            <span className="footer-text">EMP</span>
                        </NavLink>
                        
                        <NavLink to="/add-employee">
                            <FaUserTie className="footer-icon" />
                            <span className="footer-text">HR</span>
                        </NavLink>

                        <NavLink to="/login">
                            <FaSignInAlt className="footer-icon" />
                            <span className="footer-text">Login</span>
                        </NavLink>
                    </>
                )}
            </nav>
        </footer>
    );
};

export default Footer;