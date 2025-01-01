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
import Transactions from "../pages/User/Transactions";
import ProfileSetting from "../pages/User/ProfileSetting";

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
  {
    id: 5,
    path: AppRoutings.Transactions,
    exact: true,
    isProtectedRoute: true,
    component: <Transactions />,
    isAdmin: false,
  },
  {
    id: 6,
    path: AppRoutings.Setting,
    exact: true,
    isProtectedRoute: true,
    component: <ProfileSetting />,
    isAdmin: false,
  },
];

const AppRoutes: React.FC = () => {
  const { userEmail, token } = useSelector((state: IRootState) => state.auth);
  const location = useLocation();
  const isAdminRole = userEmail?.includes("admin");
  const urlList = [
    AppRoutings.Dashboard,
    AppRoutings.AdminHome,
    AppRoutings.Transactions,
    AppRoutings.Setting,
  ];
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
