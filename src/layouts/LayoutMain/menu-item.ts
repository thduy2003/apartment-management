import { RouteInfo } from "./sidebar.metadata";

export const routes: RouteInfo[] = [
  {
    path: "/admin/expenses",
    title: "Quản lý khoản chi phí",
    icon: "zmdi zmdi-view-dashboard",
  },
  {
    path: "/admin/invoices",
    title: "Quản lý hóa đơn",
    icon: "zmdi zmdi-view-dashboard",
  },
  {
    path: "/admin/utilities",
    title: "Quản lý tiện ích",
    icon: "zmdi zmdi-view-dashboard",
  },
  // {
  //   path: '/admin/class/${id}',
  //   title: 'Class Detail',
  //   icon: 'zmdi zmdi-view-dashboard',
  //   allowedGroups: [UserRole.Teacher]
  // },
  {
    path: "/admin/apartments",
    title: "Quản lý căn hộ",
    icon: "zmdi zmdi-view-dashboard",
  },
  {
    path: "/admin/residents",
    title: "Quản lý cư dân đại diện",
    icon: "zmdi zmdi-view-dashboard",
  },
];
