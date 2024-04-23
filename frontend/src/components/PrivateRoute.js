// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
// import UserProfile from "../pages/UserProfile";
import Dashboard from "../pages/Dashboard";

const PrivateRoute = () => {
  const user = useAuth();

  return (
    <>
      {user.user !== null ? <Dashboard /> : <Navigate to="/login/"/>}
    </>
  );
};

export default PrivateRoute;
