// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('token') || null);

  const login = (token) => {
    // Perform login request and set user data upon successful login
    setUser(token);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    // Perform logout action (clear user data from storage, etc.)
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
