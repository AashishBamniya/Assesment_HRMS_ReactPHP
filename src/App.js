import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AddEmployeePage from './pages/AddEmployeePage';
import ManageEmployeePage from './pages/ManageEmployeePage';
import './App.css';

// A component to protect routes based on login status and role
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isLoggedIn, role } = useAuth();

  // If not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  // If role is not allowed, also redirect to login or another page
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />; // Or a permission denied page
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/add-employee"
              element={
                <ProtectedRoute allowedRoles={['HR']}>
                  <AddEmployeePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-employee"
              element={
                <ProtectedRoute allowedRoles={['HR', 'Employee']}>
                  <ManageEmployeePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;