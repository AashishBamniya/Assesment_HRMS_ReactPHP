import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './css/LoginPage.css';

const LoginPage = () => {
  const [loginAs, setLoginAs] = useState('');
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if a role is selected from the dropdown
    if (!loginAs) {
      alert('Please select a role to log in.');
      return;
    }

    // A simple regex to check for a valid email format
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginId);
    // Simple password validation (e.g., at least 4 characters)
    const isPasswordValid = password.length >= 4;

    if (isEmailValid && isPasswordValid) {
      // Call the login function from AuthContext to set the state and role
      login(loginAs);

      if (loginAs === 'HR') {
        alert('HR Login Successful!');
        navigate('/add-employee');
      } else if (loginAs === 'Employee') {
        alert('Employee Login Successful!');
        navigate('/manage-employee');
      }
    } else {
      alert('Please enter a valid email and a password with at least 4 characters.');
    }
  };

  return (
    <div className="container">
      <Header />
      <main className="login-main">
        <div className="login-box">
          <h2>LOGIN</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="login-as">Login As</label>
              {/* Dropdown menu for role selection */}
              <select
                id="login-as"
                value={loginAs}
                onChange={(e) => setLoginAs(e.target.value)}
                required
              >
                <option value="">-- Select Role --</option>
                <option value="HR">HR</option>
                <option value="Employee">Employee</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="login-id">Login ID (Email)</label>
              <input
                type="email"
                id="login-id"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
          <a href="#" className="forgot-password">Forgot Password?</a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;