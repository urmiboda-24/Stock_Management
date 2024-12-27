import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../store/store";
import { AppRoutings } from "../utils/enums/app-routings";

interface PrivateRouteProps {
  allowedRoles: string[];
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<PrivateRouteProps> = ({
  allowedRoles,
  children,
}) => {
  const auth = useSelector((state: IRootState) => state.auth);

  if (!auth.isAuthenticated || !allowedRoles.includes(auth.role)) {
    return <Navigate to={AppRoutings.LogIn} replace />;
  }
  return <>{children || <Outlet />}</>;
};

export default ProtectedRoute;
