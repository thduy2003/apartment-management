import { RouteInfo } from "./sidebar.metadata";
import { DollarOutlined, HomeOutlined, RedEnvelopeOutlined, UserOutlined, WindowsOutlined } from "@ant-design/icons";

export const routes: RouteInfo[] = [
  {
    path: "/admin/expenses",
    title: "Quản lý khoản chi phí",
    icon: <DollarOutlined />,
  },
  {
    path: "/admin/invoices",
    title: "Quản lý hóa đơn",
    icon: <RedEnvelopeOutlined />,
  },
  {
    path: "/admin/utilities",
    title: "Quản lý tiện ích",
    icon: <WindowsOutlined />,
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
    icon: <HomeOutlined />,
  },
  {
    path: "/admin/residents",
    title: "Quản lý cư dân đại diện",
    icon: <UserOutlined />,
  },
];
