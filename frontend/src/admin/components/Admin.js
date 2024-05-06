// 05/05/2024 12:58
// reaphsoft-workman
// github.com/kahlflekzy

import {useAuth} from "../../components/AuthContext";
import {Navigate} from "react-router-dom";
import React from "react";

export const Admin = ({content}) => {
  const userAuth = useAuth();
  return (
      <>
          {!userAuth.admin ? <Navigate to="/admin/login/"/> : content()}
      </>
  );
}