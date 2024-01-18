import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function RootLayout() {
  let isAuthenticated = false;

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" />
  );
};

export default RootLayout