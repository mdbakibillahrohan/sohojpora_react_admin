"use client"

import type React from "react"
import { useState } from "react"
import { Row, Col, Card, Typography, Statistic, Progress, Table, Button, Dropdown, DatePicker, Tabs } from "antd"
import {
  UserOutlined,
  BookOutlined,
  DollarOutlined,
  RiseOutlined,
  TeamOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  MoreOutlined,
  DownOutlined,
  CalendarOutlined,
} from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import { Line, Pie } from "@ant-design/charts"

const { Title, Text } = Typography
const { RangePicker } = DatePicker
const { TabPane } = Tabs

interface UserData {
  key: string
  name: string
  email: string
  role: string
  status: string
  joinDate: string
}

interface CourseData {
  key: string
  title: string
  instructor: string
  students: number
  rating: number
  revenue: number
  status: string
}

const Dashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState<[string, string]>(["last7days", "Last 7 Days"])

  // Sample data for charts
  const userActivityData = [
    { date: "2023-05-01", value: 350, category: "Active Users" },
    { date: "2023-05-02", value: 420, category: "Active Users" },
    { date: "2023-05-03", value: 390, category: "Active Users" },
    { date: "2023-05-04", value: 450, category: "Active Users" },
    { date: "2023-05-05", value: 480, category: "Active Users" },
    { date: "2023-05-06", value: 520, category: "Active Users" },
    { date: "2023-05-07", value: 540, category: "Active Users" },
    { date: "2023-05-01", value: 20, category: "New Registrations" },
    { date: "2023-05-02", value: 35, category: "New Registrations" },
    { date: "2023-05-03", value: 28, category: "New Registrations" },
    { date: "2023-05-04", value: 40, category: "New Registrations" },
    { date: "2023-05-05", value: 45, category: "New Registrations" },
    { date: "2023-05-06", value: 38, category: "New Registrations" },
    { date: "2023-05-07", value: 50, category: "New Registrations" },
  ]

  const revenueData = [
    { date: "2023-05-01", value: 1200 },
    { date: "2023-05-02", value: 1500 },
    { date: "2023-05-03", value: 1300 },
    { date: "2023-05-04", value: 1800 },
    { date: "2023-05-05", value: 2000 },
    { date: "2023-05-06", value: 1900 },
    { date: "2023-05-07", value: 2200 },
  ]

  const courseDistributionData = [
    { type: "Web Development", value: 35 },
    { type: "Data Science", value: 25 },
    { type: "Design", value: 18 },
    { type: "Business", value: 15 },
    { type: "Other", value: 7 },
  ]

  // Sample data for tables
  const recentUsers: UserData[] = [
    {
      key: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      role: "Student",
      status: "Active",
      joinDate: "2023-05-07",
    },
    {
      key: "2",
      name: "Emily Johnson",
      email: "emily.j@example.com",
      role: "Instructor",
      status: "Active",
      joinDate: "2023-05-06",
    },
    {
      key: "3",
      name: "Michael Brown",
      email: "michael.b@example.com",
      role: "Student",
      status: "Inactive",
      joinDate: "2023-05-05",
    },
    {
      key: "4",
      name: "Sarah Wilson",
      email: "sarah.w@example.com",
      role: "Student",
      status: "Active",
      joinDate: "2023-05-04",
    },
    {
      key: "5",
      name: "David Lee",
      email: "david.lee@example.com",
      role: "Student",
      status: "Active",
      joinDate: "2023-05-03",
    },
  ]

  const topCourses: CourseData[] = [
    {
      key: "1",
      title: "Advanced React Development",
      instructor: "John Doe",
      students: 1245,
      rating: 4.8,
      revenue: 24900,
      status: "Published",
    },
    {
      key: "2",
      title: "Data Science Fundamentals",
      instructor: "Jane Smith",
      students: 980,
      rating: 4.7,
      revenue: 19600,
      status: "Published",
    },
    {
      key: "3",
      title: "UI/UX Design Masterclass",
      instructor: "Mike Johnson",
      students: 875,
      rating: 4.9,
      revenue: 17500,
      status: "Published",
    },
    {
      key: "4",
      title: "Python for Machine Learning",
      instructor: "Emily Chen",
      students: 760,
      rating: 4.6,
      revenue: 15200,
      status: "Published",
    },
    {
      key: "5",
      title: "Full Stack Web Development",
      instructor: "Robert Wilson",
      students: 690,
      rating: 4.5,
      revenue: 13800,
      status: "Published",
    },
  ]

  const userColumns: ColumnsType<UserData> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${role === "Instructor" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}
        >
          {role}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Join Date",
      dataIndex: "joinDate",
      key: "joinDate",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Dropdown
          menu={{
            items: [
              { key: "1", label: "View Details" },
              { key: "2", label: "Edit User" },
              { key: "3", label: "Disable Account", danger: true },
            ],
          }}
          trigger={["click"]}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ]

  const courseColumns: ColumnsType<CourseData> = [
    {
      title: "Course Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Instructor",
      dataIndex: "instructor",
      key: "instructor",
    },
    {
      title: "Students",
      dataIndex: "students",
      key: "students",
      sorter: (a, b) => a.students - b.students,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => (
        <span className="flex items-center">
          {rating} <span className="text-yellow-500 ml-1">★</span>
        </span>
      ),
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
      render: (revenue) => `$${revenue.toLocaleString()}`,
      sorter: (a, b) => a.revenue - b.revenue,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">{status}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Dropdown
          menu={{
            items: [
              { key: "1", label: "View Details" },
              { key: "2", label: "Edit Course" },
              { key: "3", label: "Unpublish", danger: true },
            ],
          }}
          trigger={["click"]}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ]

  const handleDateRangeChange = (value: string, label: string) => {
    setDateRange([value, label])
  }

  const dateRangeMenu = {
    items: [
      { key: "today", label: "Today" },
      { key: "yesterday", label: "Yesterday" },
      { key: "last7days", label: "Last 7 Days" },
      { key: "last30days", label: "Last 30 Days" },
      { key: "thisMonth", label: "This Month" },
      { key: "lastMonth", label: "Last Month" },
      { key: "custom", label: "Custom Range" },
    ],
    onClick: ({ key, domEvent }: { key: string; domEvent: any }) => {
      const label = domEvent.target.innerText
      handleDateRangeChange(key, label)
    },
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={2} className="mb-0">
            Admin Dashboard
          </Title>
          <Text type="secondary">Welcome back! Here's what's happening with your platform.</Text>
        </div>
        <div className="flex items-center gap-2">
          <Dropdown menu={dateRangeMenu} trigger={["click"]}>
            <Button>
              <CalendarOutlined className="mr-1" />
              {dateRange[1]} <DownOutlined />
            </Button>
          </Dropdown>
          <RangePicker className="ml-2" />
        </div>
      </div>

      {/* Stats Cards */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title={
                <div className="flex items-center justify-between">
                  <span>Total Users</span>
                  <UserOutlined className="text-blue-500 text-xl bg-blue-50 p-2 rounded-lg" />
                </div>
              }
              value={5280}
              valueStyle={{ color: "#1890ff" }}
              prefix={<TeamOutlined />}
              suffix={
                <span className="text-sm text-green-500 ml-2">
                  <RiseOutlined /> 12%
                </span>
              }
            />
            <div className="mt-2 text-gray-500 text-sm">
              <span className="text-green-500 font-medium">+120</span> new users this week
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title={
                <div className="flex items-center justify-between">
                  <span>Total Courses</span>
                  <BookOutlined className="text-purple-500 text-xl bg-purple-50 p-2 rounded-lg" />
                </div>
              }
              value={248}
              valueStyle={{ color: "#722ed1" }}
              prefix={<FileTextOutlined />}
              suffix={
                <span className="text-sm text-green-500 ml-2">
                  <RiseOutlined /> 8%
                </span>
              }
            />
            <div className="mt-2 text-gray-500 text-sm">
              <span className="text-green-500 font-medium">+15</span> new courses this month
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title={
                <div className="flex items-center justify-between">
                  <span>Total Revenue</span>
                  <DollarOutlined className="text-green-500 text-xl bg-green-50 p-2 rounded-lg" />
                </div>
              }
              value={128560}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix="$"
              suffix={
                <span className="text-sm text-green-500 ml-2">
                  <RiseOutlined /> 15%
                </span>
              }
            />
            <div className="mt-2 text-gray-500 text-sm">
              <span className="text-green-500 font-medium">+$12,450</span> this month
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title={
                <div className="flex items-center justify-between">
                  <span>Completion Rate</span>
                  <CheckCircleOutlined className="text-orange-500 text-xl bg-orange-50 p-2 rounded-lg" />
                </div>
              }
              value={78.5}
              precision={1}
              valueStyle={{ color: "#fa8c16" }}
              suffix="%"
            />
            <Progress percent={78.5} showInfo={false} strokeColor="#fa8c16" />
            <div className="mt-2 text-gray-500 text-sm">
              <span className="text-green-500 font-medium">+2.4%</span> from last month
            </div>
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[24, 24]} className="mt-6">
        <Col xs={24} lg={16}>
          <Card
            title="User Activity"
            bordered={false}
            className="shadow-sm"
            extra={
              <div className="flex items-center">
                <div className="flex items-center mr-4">
                  <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
                  <span className="text-xs text-gray-500">Active Users</span>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                  <span className="text-xs text-gray-500">New Registrations</span>
                </div>
              </div>
            }
          >
            <Line
              data={userActivityData}
              xField="date"
              yField="value"
              seriesField="category"
              smooth
              animation={{
                appear: {
                  animation: "path-in",
                  duration: 1000,
                },
              }}
              color={["#1890ff", "#52c41a"]}
              point={{
                size: 5,
                shape: "circle",
              }}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Course Distribution" bordered={false} className="shadow-sm">
            <Pie
              data={courseDistributionData}
              angleField="value"
              colorField="type"
              radius={0.8}
              innerRadius={0.6}
              label={{
                type: "inner",
                offset: "-30%",
                content: "{percentage}",
                style: {
                  fontSize: 14,
                  textAlign: "center",
                },
              }}
              interactions={[{ type: "element-active" }]}
              statistic={{
                title: {
                  style: {
                    fontSize: "14px",
                  },
                  content: "Courses",
                },
                content: {
                  style: {
                    fontSize: "24px",
                  },
                  content: "248",
                },
              }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} className="mt-6">
        <Col xs={24}>
          <Card title="Revenue Overview" bordered={false} className="shadow-sm">
            <Line
              data={revenueData}
              xField="date"
              yField="value"
              smooth
              animation={{
                appear: {
                  animation: "path-in",
                  duration: 1000,
                },
              }}
              color="#52c41a"
              point={{
                size: 5,
                shape: "diamond",
              }}
              meta={{
                value: {
                  formatter: (v) => `$${v.toLocaleString()}`,
                },
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* Tables */}
      <Row gutter={[24, 24]} className="mt-6">
        <Col xs={24}>
          <Card bordered={false} className="shadow-sm">
            <Tabs defaultActiveKey="1">
              <TabPane
                tab={
                  <span>
                    <TeamOutlined /> Recent Users
                  </span>
                }
                key="1"
              >
                <Table columns={userColumns} dataSource={recentUsers} pagination={{ pageSize: 5 }} className="mt-4" />
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <BookOutlined /> Top Courses
                  </span>
                }
                key="2"
              >
                <Table columns={courseColumns} dataSource={topCourses} pagination={{ pageSize: 5 }} className="mt-4" />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
