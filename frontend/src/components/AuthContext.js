// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('user') || null);

  const login = (userData) => {
    // Perform login request and set user data upon successful login
    setUser(userData);
    localStorage.setItem('user', userData);
  };

  const logout = () => {
    // Perform logout action (clear user data from storage, etc.)
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
