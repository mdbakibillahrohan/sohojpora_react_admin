"use client"

import type React from "react"
import { useState } from "react"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  UserOutlined,
  BookOutlined,
  SettingOutlined,
  BellOutlined,
  TeamOutlined,
  FileTextOutlined,
  BarChartOutlined,
  ShoppingOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons"
import { Avatar, Badge, Button, Dropdown, Layout, Menu, Typography, theme, type MenuProps } from "antd"
import { useNavigate, useLocation, type RoutesProps } from "react-router-dom"

const { Header, Sider, Content, Footer } = Layout
const { Title } = Typography

const MainLayout: React.FC = ({ children }: RoutesProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG, colorPrimary },
  } = theme.useToken()

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Admin Account",
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Profile",
      icon: <UserOutlined />,
    },
    {
      key: "3",
      label: "Settings",
      icon: <SettingOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: "Logout",
      icon: <LogoutOutlined />,
      danger: true,
    },
  ]

  const notifications = [
    {
      key: "1",
      label: "John Smith left a review",
    },
    {
      key: "2",
      label: "New course approval needed",
    },
    {
      key: "3",
      label: "System update scheduled",
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: "View all notifications",
    },
  ]

  const getSelectedKeys = () => {
    const path = location.pathname.split("/")[1]
    return [path || "dashboard"]
  }

  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="shadow-lg"
        width={260}
        style={{
          background: colorPrimary,
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 10,
        }}
      >
        <div className="p-4 flex items-center justify-center">
          {!collapsed && (
            <Title level={3} className="m-0 text-white">
              Sohoj Pora LMS
            </Title>
          )}
          {collapsed && (
            <Title level={4} className="m-0 text-white">
              SP
            </Title>
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          selectedKeys={getSelectedKeys()}
          style={{ background: colorPrimary }}
          onClick={(e) => {
            navigate("/" + e.key)
          }}
          items={[
            {
              key: "dashboard",
              icon: <DashboardOutlined />,
              label: "Dashboard",
            },
            {
              key: "users",
              icon: <TeamOutlined />,
              label: "User Management",
            },
            {
              key: "courses",
              icon: <BookOutlined />,
              label: "Course Management",
            },
            {
              key: "enrollments",
              icon: <ShoppingOutlined />,
              label: "Enrollments",
            },
            {
              key: "content",
              icon: <FileTextOutlined />,
              label: "Content Library",
            },
            {
              key: "analytics",
              icon: <BarChartOutlined />,
              label: "Analytics",
            },
            {
              key: "settings",
              icon: <SettingOutlined />,
              label: "Settings",
            },
          ]}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 260, transition: "all 0.2s" }}>
        <Header
          style={{
            padding: "0 24px",
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
            position: "sticky",
            top: 0,
            zIndex: 9,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="flex items-center gap-4">
            <Button type="text" icon={<QuestionCircleOutlined />} />

            <Dropdown menu={{ items: notifications }} placement="bottomRight">
              <Badge count={3} dot>
                <Button type="text" icon={<BellOutlined style={{ fontSize: "20px" }} />} />
              </Badge>
            </Dropdown>

            <Dropdown menu={{ items }} placement="bottomRight">
              <Button type="text" className="flex items-center">
                <Avatar style={{ backgroundColor: colorPrimary }}>
                  <UserOutlined />
                </Avatar>
                {!collapsed && <span className="ml-2 hidden md:inline">Admin User</span>}
              </Button>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
        <Footer style={{ textAlign: "center" }}>Sohoj Pora LMS Admin Panel ©{new Date().getFullYear()}</Footer>
      </Layout>
    </Layout>
  )
}

export default MainLayout
