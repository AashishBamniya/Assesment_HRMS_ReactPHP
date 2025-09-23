import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AddEmployeePage from './pages/AddEmployeePage';
import ManageEmployeePage from './pages/ManageEmployeePage';
import ApprovalPage from './pages/ApprovalPage'; // New import
import './App.css';

// ProtectedRoute component to control access to routes
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isLoggedIn, role } = useAuth();

    if (!isLoggedIn) {
        // If not logged in, redirect to the login page
        return <Navigate to="/login" replace />;
    }
    if (allowedRoles && !allowedRoles.includes(role)) {
        // If logged in but the role is not allowed, redirect to the home page
        return <Navigate to="/" replace />;
    }

    // If logged in and role is correct, render the children (the page component)
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
                        <Route
                            path="/approval" // New route for ApprovalPage
                            element={
                                <ProtectedRoute allowedRoles={['HR']}>
                                    <ApprovalPage />
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