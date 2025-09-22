import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AddEmployeePage from './pages/AddEmployeePage';
import ManageEmployeePage from './pages/ManageEmployeePage';
import './App.css';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isLoggedIn, role } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
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