import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

export const ProtectedRoute: React.FC<{ component: any }> = ({ component }) => {
  const { user } = useUserContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  } else {
    return component;
  }
}