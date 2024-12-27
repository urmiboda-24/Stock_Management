import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./protectedPath";
import { createInnerRoute, ICustomRoute } from "./helper";
import SignUp from "../pages/SignUp";
import { AppRoutings } from "../utils/enums/app-routings";

// Lazy-loaded components
const AdminDashboard = lazy(() => import("../pages/Admin/home"));
const UserDashboard = lazy(() => import("../pages/User/Dashboard"));
const Login = lazy(() => import("../pages/Login"));

// Fallback while loading components
const LoadingFallback: React.FC = () => <div>Loading...</div>;

const AppRoute: React.FC = () => {
  const dashboardRoutes = [
    createInnerRoute("admin", "dashboard/", <AdminDashboard />),
    createInnerRoute("user", "dashboard/", <UserDashboard />),
  ];

  const commonRoutes: ICustomRoute[] = [
    { path: AppRoutings.LogIn, element: <Login />, isPrivate: false },
    { path: AppRoutings.SignUp, element: <SignUp />, isPrivate: false },
  ];

  const allRoutes: ICustomRoute[] = [...dashboardRoutes, ...commonRoutes];
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {allRoutes.map(
            ({ path, element, isPrivate, allowedRoles }, index) => {
              if (isPrivate) {
                return (
                  <Route
                    key={index}
                    path={path}
                    element={
                      <ProtectedRoute allowedRoles={allowedRoles || []}>
                        {element}
                      </ProtectedRoute>
                    }
                  />
                );
              }
              return <Route key={index} path={path} element={element} />;
            }
          )}

          <Route path="/" element={<Navigate to={AppRoutings.LogIn} />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoute;
