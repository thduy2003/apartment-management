import SideBar from "../layouts/LayoutMain";

import { Navigate, useRoutes } from "react-router-dom";
// import { routes } from "../layouts/LayoutMain/menu-item";
import Expense from "../pages/expense";
import Invoice from "../pages/invoice";
import { Complaint, PageApp } from "../pages/app";

export default function useRoutesElements() {
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    return <RoleBaseRoute>{children}</RoleBaseRoute>;
  };
  const RoleBaseRoute = ({ children }: { children: React.ReactNode }) => {
    // const location = useLocation();
    // const route = routes.find((route) => route.path === location.pathname || location.pathname.startsWith(route.path));
    return children;
  };

  const routeElements = useRoutes([
    {
      path: "/",
      element: <Navigate to='/app' replace />, // Redirect từ `/` đến `/app`
    },
    {
      path: "/admin",
      element: <SideBar />,
      children: [
        {
          index: true,
          element: <Navigate to='/admin/expenses' replace />,
        },
        {
          path: "expenses",
          element: (
            <ProtectedRoute>
              <Expense />
            </ProtectedRoute>
          ),
        },
        {
          path: "invoices",
          element: (
            <ProtectedRoute>
              <Invoice />
            </ProtectedRoute>
          ),
        },
        {
          path: "utilities",
          element: (
            <ProtectedRoute>
              <h1>Quản lý tiện ích</h1>
            </ProtectedRoute>
          ),
        },
        {
          path: "apartments",
          element: (
            <ProtectedRoute>
              <h1>Quản lý căn hộ</h1>
            </ProtectedRoute>
          ),
        },
        {
          path: "residents",
          element: (
            <ProtectedRoute>
              <h1>Quản lý cư dân đại diện</h1>
            </ProtectedRoute>
          ),
        },
        {
          path: "notifications",
          element: (
            <ProtectedRoute>
              <h1>Thông báo</h1>
            </ProtectedRoute>
          ),
        },
        {
          path: "cards",
          element: (
            <ProtectedRoute>
              <h1>Thẻ</h1>
            </ProtectedRoute>
          ),
        },
        {
          path: "reports",
          element: (
            <ProtectedRoute>
              <h1>Báo cáo</h1>
            </ProtectedRoute>
          ),
        },
        {
          path: "care",
          element: (
            <ProtectedRoute>
              <h1>Chăm sóc cư dân</h1>
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "app",
      children: [
        {
          index: true,
          element: <PageApp />,
        },
        {
          path: "complaint",
          element: <Complaint />,
        },
      ],
    },
    { path: "*", element: <h1>not found</h1> },
  ]);

  return routeElements;
}
