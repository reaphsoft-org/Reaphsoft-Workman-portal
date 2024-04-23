// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Dashboard from "../pages/Dashboard";
import User from "./User";

const PrivateRoute = () => {
  const user = useAuth();

  return (
    <>
      {user.user !== null ? <User content={Dashboard} /> : <Navigate to="/login/"/>}
    </>
  );
};

export default PrivateRoute;
