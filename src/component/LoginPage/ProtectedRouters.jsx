import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRouters = () => {
  const { getUser } = useSelector((state) => state);
  const { user } = getUser;
  // console.log(user, "protectedrouter");
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRouters;
