// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setAdmin] = useState(JSON.parse(localStorage.getItem('adminData')) || null);
  const [data, setData] = useState({});
  
  const login = (adminData) => {
    // Perform login request and set user data upon successful login
    setAdmin(adminData);
    localStorage.setItem('adminData', JSON.stringify(adminData));
  };

  const logout = () => {
    // Perform logout action (clear user data from storage, etc.)
    setAdmin(null);
    localStorage.removeItem('adminData');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout , data , setData}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
