import { RouteInfo } from "./sidebar.metadata";
import {
  DollarOutlined,
  FileTextOutlined,
  HeartOutlined,
  HomeOutlined,
  RedEnvelopeOutlined,
  UserOutlined,
  WindowsOutlined,
} from "@ant-design/icons";

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
  {
    path: "/admin/notifications",
    title: "Thông báo",
    icon: (
      <div>
        <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 20 19' fill='none'>
          <path
            d='M17 7.5V3C17 1.89543 16.1046 1 15 1H3C1.89543 1 1 1.89543 1 3V10.8261C1 11.9307 1.89543 12.8261 3 12.8261H4.56522V17L8.73913 12.8261H9M14.163 15.3913L16.7717 18V15.3913H17C18.1046 15.3913 19 14.4959 19 13.3913V10C19 8.89543 18.1046 8 17 8H11C9.89543 8 9 8.89543 9 10V13.3913C9 14.4959 9.89543 15.3913 11 15.3913H14.163Z'
            stroke='black'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
      </div>
    ),
  },
  {
    path: "/admin/cards",
    title: "Quản lý đăng ký thẻ",
    icon: (
      <div>
        <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 22 16' fill='none'>
          <path
            d='M1.99968 5.29995H19.9997M5.59968 9.49995H8.59968M3.80015 1.1001H18.1998C19.5252 1.1001 20.5997 2.17377 20.5998 3.49923L20.6 12.5011C20.6001 13.8266 19.5255 14.9001 18.2001 14.9001L3.80038 14.8999C2.47493 14.8999 1.40044 13.8254 1.4004 12.5L1.40015 3.50016C1.40011 2.17465 2.47464 1.1001 3.80015 1.1001Z'
            stroke='black'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
      </div>
    ),
  },
  {
    path: "/admin/reports",
    title: "Báo cáo thống kê",
    icon: <FileTextOutlined />,
  },
  {
    path: "/admin/care",
    title: "Chăm sóc cư dân",
    icon: <HeartOutlined />,
  },
];
