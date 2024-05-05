// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const userKey = 'userData';
  const [user, setUser] = useState(JSON.parse(localStorage.getItem(userKey)) || null);
  const adminKey = 'adminData';
  const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem(adminKey)) || null);

  const login = (userData) => {
    // Perform login request and set user data upon successful login
    setUser(userData);
    localStorage.setItem(userKey, JSON.stringify(userData));
    // logoutAdmin();
  };

  const logout = () => {
    // Perform logout action (clear user data from storage, etc.)
    setUser(null);
    localStorage.removeItem(userKey);
  };

  const loginAdmin = (data) => {
    setAdmin(data);
    localStorage.setItem(adminKey, JSON.stringify(data));
    // logout();
  }
  const logoutAdmin = () => {
    // Perform logout action (clear user data from storage, etc.)
    setAdmin(null);
    localStorage.removeItem(adminKey);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, admin, loginAdmin, logoutAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
