import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import React from "react";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();
  
  if (!auth.currentUser) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}