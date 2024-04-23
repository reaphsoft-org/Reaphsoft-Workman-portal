import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import User from "./User";
import UserProfile from "../pages/UserProfile";

const PrivateRoute = () => {
  const userAuth = useAuth();
  return (
    <>
      {userAuth.user !== null ? <User content={UserProfile} /> : <Navigate to="/login/"/>}
    </>
  );
};

export default PrivateRoute;
