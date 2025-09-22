import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

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
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('role', userRole);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setRole(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};