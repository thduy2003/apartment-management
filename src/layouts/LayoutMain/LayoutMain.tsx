import React, { useState } from "react";
import { Layout, Menu, MenuProps } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { routes } from "./menu-item";
import { AppstoreOutlined } from "@ant-design/icons";
import "./LayoutMain.css";
const { Sider, Content } = Layout;
const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const location = useLocation();
  const [width, setWidth] = useState<string>("80%");
  const [marginLeft, setMarginLeft] = useState<string>("20%");
  const [menuItems, setMenuItems] = useState<MenuProps["items"]>([]);
  const [activeMenu, setActiveMenu] = useState("");

  // const itemsDropdown = [
  //   {
  //     label: <Link to={"/admin"}>Trang chủ</Link>,
  //     key: "home",
  //   },
  //   {
  //     label: <button style={{ cursor: "pointer" }}>Logout</button>,
  //     key: "logout",
  //   },
  // ];
  React.useEffect(() => {
    const full = routes.map((item) => {
      return {
        label: <Link to={item.path}>{item.title}</Link>,
        key: `${item.path}`,
        icon: <AppstoreOutlined />,
      };
    });
    setMenuItems(full);
  }, []);
  React.useEffect(() => {
    const subMenu = menuItems?.find((item) => item?.key === location.pathname);
    if (subMenu) {
      setActiveMenu(subMenu?.key?.toString() as string);
    } else {
      setActiveMenu(location.pathname.substring(0, location.pathname.length - 2));
    }
  }, [location, menuItems]);
  React.useEffect(() => {
    setWidth(collapsed ? "100%" : "80%");
    setMarginLeft(collapsed ? "0" : "20%");
  }, [collapsed]);

  const pageTitles: { [key: string]: string } = {
    "/admin/expenses": "QUẢN LÝ CHI PHÍ",
    "/admin/invoices": "QUẢN LÝ HÓA ĐƠN",
    "/admin/utilities": "QUẢN LÝ TIỆN ÍCH",
    "/admin/apartments": "QUẢN LÝ CĂN HỘ",
    "/admin/residents": "QUẢN LÝ CƯ DÂN ĐẠI DIỆN",
  };

  // Lấy tiêu đề dựa trên pathname
  const currentTitle = pageTitles[location.pathname] || "QUẢN LÝ CHI PHÍ";

  return (
    <>
      {/* <Header style={{ padding: 0, background: colorBgContainer, position: "fixed", top: 0 }} className='flex justify-between w-full z-50'>
        <Button
          type='text'
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => {
            setCollapsed(!collapsed);
          }}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
      </Header> */}
      <Layout className='w-full h-screen'>
        <Sider
          trigger={null}
          breakpoint='lg'
          onBreakpoint={(broken) => {
            setCollapsed(broken);
          }}
          width='20%'
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            background: "white",
            borderRadius: "12px",
          }}
          collapsedWidth='0'
          collapsible
          collapsed={collapsed}
          className='transition-all duration-400 ease-in-out'
        >
          <div className='flex flex-col items-center justify-center pt-4 px-4 mb-[24px]'>
            <img className='w-[78px] h-[60px]' src='../../public/logo.jpg'></img>
            <h1 className='text-[#1745E8] text-[16px] font-bold mb-[24px]'>HỆ THỐNG QUẢN LÝ CHUNG CƯ</h1>
            <div className='border-t-[2px]  border-[#D6D6D6] border-solid w-full h-[2px]'></div>
          </div>
          <Menu theme='dark' selectedKeys={[activeMenu]} mode='inline' items={menuItems} onClick={(e) => setActiveMenu(e.key)} />
        </Sider>
        <Layout
          style={{
            width: width,
            overflow: "auto",
            marginLeft: marginLeft,
          }}
          className='transition-all duration-400 ease-in-out'
        >
          <Content
            style={{
              margin: "0px 16px",
              height: "100%",
            }}
          >
            <div className='bg-white rounded-xl p-6 text-[#1745E8] font-bold text-[20px] mb-[12px]'>{currentTitle}</div>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
