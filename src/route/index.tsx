import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AdminHome from "../pages/Admin/home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/User/Dashboard";
import { AppRoutings } from "../utils/enums/app-routings";
import { IRoute } from "../utils/interface/common";
import { useSelector } from "react-redux";
import { IRootState } from "../store/store";
import SidebarComponent from "../component/sidebar";

const RouteList: IRoute[] = [
  {
    id: 1,
    path: AppRoutings.LogIn,
    exact: true,
    isProtectedRoute: false,
    component: <Login />,
    isAdmin: false,
  },
  {
    id: 2,
    path: AppRoutings.SignUp,
    exact: true,
    isProtectedRoute: false,
    component: <SignUp />,
    isAdmin: false,
  },
  {
    id: 3,
    path: AppRoutings.Dashboard,
    exact: true,
    isProtectedRoute: true,
    component: <Dashboard />,
    isAdmin: false,
  },
  {
    id: 4,
    path: AppRoutings.AdminHome,
    exact: true,
    isProtectedRoute: true,
    component: <AdminHome />,
    isAdmin: true,
  },
];

const AppRoutes: React.FC = () => {
  const { userEmail, token } = useSelector((state: IRootState) => state.auth);
  const location = useLocation();
  const isAdminRole = userEmail?.includes("admin");
  const urlList = [AppRoutings.Dashboard, AppRoutings.AdminHome];
  const showSidebar = urlList.toString().includes(location.pathname);
  const htmlElement = () => {
    return (
      <Routes>
        {RouteList.map(({ id, path, isProtectedRoute, isAdmin, component }) => {
          if (isProtectedRoute && !token) {
            return (
              <Route
                key={id}
                path={path}
                element={<Navigate to={AppRoutings.LogIn} replace />}
              />
            );
          }

          if (isAdmin && isAdminRole) {
            return <Route key={id} path={path} element={component} />;
          }

          if (!isAdmin && !isAdminRole) {
            return <Route key={id} path={path} element={component} />;
          }

          if (!isProtectedRoute) {
            return <Route key={id} path={path} element={component} />;
          }

          return (
            <Route
              key={id}
              path={path}
              element={<Navigate to={AppRoutings.LogIn} replace />}
            />
          );
        })}
      </Routes>
    );
  };

  return showSidebar ? (
    <SidebarComponent>{htmlElement()}</SidebarComponent>
  ) : (
    htmlElement()
  );
};

export default AppRoutes;
