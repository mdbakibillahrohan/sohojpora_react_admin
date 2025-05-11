import type React from "react"
import { Card, Typography, Row, Col, Statistic, Table, Tag, List, Avatar, Button, Calendar, Badge } from "antd"
import {
  UserOutlined,
  BookOutlined,
  DollarOutlined,
  RiseOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  BellOutlined,
  CalendarOutlined,
  MessageOutlined,
  WarningOutlined,
  StarOutlined,
  FileTextOutlined,
} from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import type { Dayjs } from "dayjs"

const { Title, Text, Paragraph } = Typography

interface RecentEnrollmentData {
  key: string
  student: string
  course: string
  date: string
  amount: number
}

interface RecentActivityData {
  key: string
  user: string
  action: string
  time: string
  type: string
}

const AdminDashboard: React.FC = () => {
  // Sample data for recent enrollments
  const recentEnrollments: RecentEnrollmentData[] = [
    {
      key: "1",
      student: "John Smith",
      course: "Advanced React Development",
      date: "2023-05-07",
      amount: 79.99,
    },
    {
      key: "2",
      student: "Emily Johnson",
      course: "Data Science Fundamentals",
      date: "2023-05-06",
      amount: 59.99,
    },
    {
      key: "3",
      student: "Michael Brown",
      course: "UI/UX Design Masterclass",
      date: "2023-05-06",
      amount: 69.99,
    },
    {
      key: "4",
      student: "Sarah Wilson",
      course: "Python for Machine Learning",
      date: "2023-05-05",
      amount: 89.99,
    },
    {
      key: "5",
      student: "David Lee",
      course: "Full Stack Web Development",
      date: "2023-05-05",
      amount: 99.99,
    },
  ]

  // Sample data for recent activities
  const recentActivities: RecentActivityData[] = [
    {
      key: "1",
      user: "John Smith",
      action: "completed course",
      time: "2 hours ago",
      type: "completion",
    },
    {
      key: "2",
      user: "Admin User",
      action: "published new course",
      time: "4 hours ago",
      type: "course",
    },
    {
      key: "3",
      user: "Emily Johnson",
      action: "submitted assignment",
      time: "5 hours ago",
      type: "assignment",
    },
    {
      key: "4",
      user: "Michael Brown",
      action: "enrolled in course",
      time: "6 hours ago",
      type: "enrollment",
    },
    {
      key: "5",
      user: "Sarah Wilson",
      action: "left a review",
      time: "8 hours ago",
      type: "review",
    },
    {
      key: "6",
      user: "David Lee",
      action: "asked a question",
      time: "10 hours ago",
      type: "question",
    },
    {
      key: "7",
      user: "Admin User",
      action: "updated course content",
      time: "12 hours ago",
      type: "course",
    },
  ]

  // Sample data for notifications
  const notifications = [
    {
      id: 1,
      title: "New Course Review",
      description: "John Smith left a 5-star review on Advanced React Development",
      time: "2 hours ago",
      type: "review",
    },
    {
      id: 2,
      title: "Course Approval Needed",
      description: "JavaScript Fundamentals course is waiting for your approval",
      time: "4 hours ago",
      type: "approval",
    },
    {
      id: 3,
      title: "New Support Ticket",
      description: "Emily Johnson opened a new support ticket regarding payment issues",
      time: "5 hours ago",
      type: "support",
    },
    {
      id: 4,
      title: "Low Storage Warning",
      description: "Your content storage is at 85% capacity",
      time: "1 day ago",
      type: "warning",
    },
  ]

  // Sample data for upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "New Course Launch",
      date: "2023-05-15",
      type: "course",
    },
    {
      id: 2,
      title: "Instructor Meeting",
      date: "2023-05-12",
      type: "meeting",
    },
    {
      id: 3,
      title: "System Maintenance",
      date: "2023-05-20",
      type: "maintenance",
    },
  ]

  // Sample data for top courses
  const topCourses = [
    {
      id: 1,
      title: "Advanced React Development",
      enrollments: 1245,
      rating: 4.8,
      revenue: 99592.55,
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      enrollments: 980,
      rating: 4.7,
      revenue: 58789.2,
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      enrollments: 875,
      rating: 4.9,
      revenue: 61236.25,
    },
  ]

  const enrollmentColumns: ColumnsType<RecentEnrollmentData> = [
    {
      title: "Student",
      dataIndex: "student",
      key: "student",
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `$${amount.toFixed(2)}`,
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "completion":
        return <CheckCircleOutlined style={{ color: "#52c41a" }} />
      case "course":
        return <BookOutlined style={{ color: "#1890ff" }} />
      case "assignment":
        return <FileTextOutlined style={{ color: "#722ed1" }} />
      case "enrollment":
        return <UserOutlined style={{ color: "#fa8c16" }} />
      case "review":
        return <StarOutlined style={{ color: "#faad14" }} />
      case "question":
        return <MessageOutlined style={{ color: "#eb2f96" }} />
      default:
        return <ClockCircleOutlined />
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "review":
        return <StarOutlined style={{ color: "#faad14" }} />
      case "approval":
        return <BookOutlined style={{ color: "#1890ff" }} />
      case "support":
        return <MessageOutlined style={{ color: "#722ed1" }} />
      case "warning":
        return <WarningOutlined style={{ color: "#ff4d4f" }} />
      default:
        return <BellOutlined />
    }
  }

  const getEventTypeTag = (type: string) => {
    let color = "default"

    switch (type) {
      case "course":
        color = "blue"
        break
      case "meeting":
        color = "green"
        break
      case "maintenance":
        color = "orange"
        break
      default:
        color = "default"
    }

    return <Tag color={color}>{type.charAt(0).toUpperCase() + type.slice(1)}</Tag>
  }

  const dateCellRender = (value: Dayjs) => {
    const dateString = value.format("YYYY-MM-DD")
    const listData = upcomingEvents.filter((event) => event.date === dateString)

    return (
      <ul className="events p-0 m-0 list-none">
        {listData.map((item) => (
          <li key={item.id} className="mb-1">
            <Badge
              status={item.type === "course" ? "success" : item.type === "meeting" ? "processing" : "warning"}
              text={item.title}
            />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div>
      <Title level={2}>Admin Dashboard</Title>
      <Text type="secondary" className="block mb-6">
        Welcome back! Here's an overview of your learning management system.
      </Text>

      {/* Stats Cards */}
      <Row gutter={[24, 24]} className="mb-6">
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Total Students"
              value={3245}
              prefix={<TeamOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
            <div className="mt-2 text-green-500 text-sm flex items-center">
              <RiseOutlined /> 12% increase
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic title="Total Courses" value={42} prefix={<BookOutlined />} valueStyle={{ color: "#52c41a" }} />
            <div className="mt-2 text-green-500 text-sm flex items-center">
              <RiseOutlined /> 8% increase
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Completion Rate"
              value={67}
              suffix="%"
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "#722ed1" }}
            />
            <div className="mt-2 text-green-500 text-sm flex items-center">
              <RiseOutlined /> 5% increase
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Total Revenue"
              value={356789.45}
              prefix={<DollarOutlined />}
              precision={2}
              valueStyle={{ color: "#eb2f96" }}
            />
            <div className="mt-2 text-green-500 text-sm flex items-center">
              <RiseOutlined /> 15% increase
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card
            title="Recent Enrollments"
            bordered={false}
            className="shadow-sm mb-6"
            extra={<Button type="link">View All</Button>}
          >
            <Table dataSource={recentEnrollments} columns={enrollmentColumns} pagination={false} size="small" />
          </Card>

          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Card
                title="Top Performing Courses"
                bordered={false}
                className="shadow-sm"
                extra={<Button type="link">View All</Button>}
              >
                <List
                  itemLayout="horizontal"
                  dataSource={topCourses}
                  renderItem={(item) => (
                    <List.Item key={item.id}>
                      <List.Item.Meta
                        avatar={<Avatar icon={<BookOutlined />} style={{ backgroundColor: "#1890ff" }} />}
                        title={item.title}
                        description={
                          <div>
                            <div className="flex items-center justify-between">
                              <span>Enrollments: {item.enrollments}</span>
                              <span className="flex items-center">
                                {item.rating} <StarOutlined className="text-yellow-500 ml-1" />
                              </span>
                            </div>
                            <div>
                              Revenue: $
                              {item.revenue.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </div>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card
                title="Upcoming Events"
                bordered={false}
                className="shadow-sm"
                extra={<Button type="link">View Calendar</Button>}
              >
                <List
                  itemLayout="horizontal"
                  dataSource={upcomingEvents}
                  renderItem={(item) => (
                    <List.Item key={item.id}>
                      <List.Item.Meta
                        avatar={<Avatar icon={<CalendarOutlined />} style={{ backgroundColor: "#722ed1" }} />}
                        title={
                          <div className="flex items-center justify-between">
                            <span>{item.title}</span>
                            {getEventTypeTag(item.type)}
                          </div>
                        }
                        description={
                          <div className="flex items-center">
                            <CalendarOutlined className="mr-1" />
                            {new Date(item.date).toLocaleDateString()}
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title="Notifications"
            bordered={false}
            className="shadow-sm mb-6"
            extra={<Button type="link">Mark All Read</Button>}
          >
            <List
              itemLayout="horizontal"
              dataSource={notifications}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    avatar={<Avatar icon={getNotificationIcon(item.type)} />}
                    title={item.title}
                    description={
                      <div>
                        <div>{item.description}</div>
                        <div className="text-xs text-gray-500 mt-1">{item.time}</div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>

          <Card
            title="Recent Activity"
            bordered={false}
            className="shadow-sm"
            extra={<Button type="link">View All</Button>}
          >
            <List
              itemLayout="horizontal"
              dataSource={recentActivities}
              renderItem={(item) => (
                <List.Item key={item.key}>
                  <List.Item.Meta
                    avatar={<Avatar icon={getActivityIcon(item.type)} />}
                    title={
                      <span>
                        <Text strong>{item.user}</Text> {item.action}
                      </span>
                    }
                    description={<div className="text-xs text-gray-500">{item.time}</div>}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Calendar" bordered={false} className="shadow-sm mt-6">
        <Calendar cellRender={dateCellRender} />
      </Card>
    </div>
  )
}

export default AdminDashboard
