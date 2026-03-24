import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const Check_auth = ({ isAutheticate, user, children }) => {
  const location = useLocation();
  console.log("PATH:", location.pathname);
  console.log("ROLE:", user?.user.role);
  // return <Navigate to="/shop/home" replace />;
  // 1️⃣ Not logged in
  if (!isAutheticate) {
    if (
      location.pathname.startsWith("/autho/login") ||
      location.pathname.startsWith("/autho/register")
    ) {
      return children;
    }
    return <Navigate to="/autho/login" replace />;
  }

  // 2️⃣ Logged in user trying to access login/register
  if (
    isAutheticate &&
    (location.pathname.startsWith("/autho/login") ||
      location.pathname.startsWith("/autho/register"))
  ) {
    if (user?.user.role === "admin") {
      return <Navigate to="/admin/deskboard" replace />;
    }
    return <Navigate to="/shop/home" replace />;
  }

  // 3️⃣ Normal user trying to access admin
  if (
    isAutheticate &&
    user?.user.role !== "admin" &&
    location.pathname.startsWith("/admin")
  ) {
    return <Navigate to="/unauth-page" replace />;
  }

  // 4️⃣ Admin trying to access shop
  if (
    isAutheticate &&
    user?.user.role === "admin" &&
    location.pathname.startsWith("/shop")
  ) {
    return <Navigate to="/admin/deskboard" replace />;
  }

  return children;
};

export default Check_auth;
