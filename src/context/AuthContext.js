import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  // Check local storage on initial app load to restore previous login state
  useEffect(() => {
    const storedLoginState = localStorage.getItem('isLoggedIn');
    const storedRole = localStorage.getItem('role');
    if (storedLoginState === 'true' && storedRole) {
      setIsLoggedIn(true);
      setRole(storedRole);
    }
  }, []);

  const login = (userRole) => {
    setIsLoggedIn(true);
    setRole(userRole);
    // Save login state to local storage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('role', userRole);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setRole(null);
    // Remove login state from local storage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily access the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};