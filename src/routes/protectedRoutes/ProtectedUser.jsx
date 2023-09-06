import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedUser = () => {
  const email = sessionStorage.getItem("email");

  return <>{email != null ? <Outlet /> : <Navigate to={"/"} />}</>;
};

export default ProtectedUser;
