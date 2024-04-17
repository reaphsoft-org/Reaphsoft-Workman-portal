// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import UserProfile from "../pages/UserProfile";

const PrivateRoute = () => {
  const user = useAuth();

  return (
    <>
      {user.user !== null ? <UserProfile/> : <Navigate to="/login/"/>}
    </>
  );
};

export default PrivateRoute;
