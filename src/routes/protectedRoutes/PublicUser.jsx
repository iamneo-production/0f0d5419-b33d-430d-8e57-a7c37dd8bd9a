import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicUser = () => {
  const email = sessionStorage.getItem("email");

  return <>{email != null ? <Navigate to={"/home"} /> : <Outlet />}</>;
};

export default PublicUser;
