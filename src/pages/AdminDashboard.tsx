import React from "react"
import { Card, Typography, Row, Col, Button, Badge, Tag } from "antd"
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
  CheckOutlined,
} from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import type { Dayjs } from "dayjs"

import SectionHeader from "../components/SectionHeader"
import GridStatsCard from "../components/GridStatsCard"
import TableWithAction from '../components/TableWithAction'
import CalendarEvents from "../components/CalendarEvents"
import AvatarLists from "../components/AvatarLists"




const { Text } = Typography

interface RecentEnrollmentData {
  key: string
  id: string
  student: string
  course: string
  date: string
  amount: number
}

interface RecentActivityData {
  id:string
  key: string
  user: string
  action: string
  time: string
  type: string
}

const AdminDashboard: React.FC = () => {
  // Sample data for recent enrollments
  const recentEnrollments: RecentEnrollmentData[] = [
    { key: "1", id:"1",student: "John Smith",course: "Advanced React Development",date: "2023-05-07",amount: 79.99,},
    { key: "2", id:"2",student: "Emily Johnson",course: "Data Science Fundamentals",date: "2023-05-06",amount: 59.99,},
    { key: "3", id:"3",student: "Michael Brown",course: "UI/UX Design Masterclass",date: "2023-05-06",amount: 69.99,},
    { key: "4", id:"4",student: "Sarah Wilson",course: "Python for Machine Learning",date: "2023-05-05",amount: 89.99,},
    { key: "5", id:"5",student: "David Lee",course: "Full Stack Web Development",date: "2023-05-05",amount: 99.99,},
  ]

  // Sample data for recent activities
  const recentActivities: RecentActivityData[] = [
    { id: "1", key: "1",user: "John Smith",action: "completed course",time: "2 hours ago",type: "completion",},
    { id: "2", key: "2",user: "Admin User",action: "published new course",time: "4 hours ago",type: "course",},
    { id: "3", key: "3",user: "Emily Johnson",action: "submitted assignment",time: "5 hours ago",type: "assignment",},
    { id: "4", key: "4",user: "Michael Brown",action: "enrolled in course",time: "6 hours ago",type: "enrollment",},
    { id: "5", key: "5",user: "Sarah Wilson",action: "left a review",time: "8 hours ago",type: "review",},
    { id: "6", key: "6",user: "David Lee",action: "asked a question",time: "10 hours ago",type: "question",},
    { id: "7", key: "7",user: "Admin User",action: "updated course content",time: "12 hours ago",type: "course",},
  ]

  // Sample data for notifications
  const notifications = [
    { id: 1,title: "New Course Review",description: "John Smith left a 5-star review on Advanced React Development",time: "2 hours ago",type: "review",},
    { id: 2,title: "Course Approval Needed",description: "JavaScript Fundamentals course is waiting for your approval",time: "4 hours ago",type: "approval",},
    { id: 3,title: "New Support Ticket",description: "Emily Johnson opened a new support ticket regarding payment issues",time: "5 hours ago",type: "support",},
    { id: 4,title: "Low Storage Warning",description: "Your content storage is at 85% capacity",time: "1 day ago",type: "warning",},
  ]

  // Sample data for upcoming events
  const upcomingEvents = [
    { id: 1,title: "New Course Launch",date: "2023-05-15",type: "course",},
    { id: 2,title: "Instructor Meeting",date: "2023-05-12",type: "meeting",},
    { id: 3,title: "System Maintenance",date: "2023-05-20",type: "maintenance",},
  ]

  // Sample data for top courses
  const topCourses = [
    {
      id: 1,
      key:1,
      title: "Advanced React Development",
      enrollments: 1245,
      rating: 4.8,
      revenue: 99592.55,
    },
    {
      id: 2,
      key:2,
      title: "Data Science Fundamentals",
      enrollments: 980,
      rating: 4.7,
      revenue: 58789.2,
    },
    {
      id: 3,
      key:3,
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
  const stats = [
      { title:"Total Students", value:3245, prefix: <TeamOutlined/>, valueStyle: {color:"#1890ff"},footer:(<><RiseOutlined/>12% increase</>) },
      { title:"Total Courses", value:3245, prefix: <BookOutlined/>, valueStyle: {color:"#52c41a"},footer:(<><RiseOutlined/>12% increase</>) },
      { title:"Completion Rate", value:3245, prefix: <CheckOutlined/>, valueStyle: {color:"#1890ff"},footer:(<><RiseOutlined/>12% increase</>) },
      { title:"Total Revenue", value:3245, prefix: <DollarOutlined/>, valueStyle: {color:"#1890ff"},footer:(<><RiseOutlined/>12% increase</>) }
      
    ]

  const [searchText, setSearchText] = React.useState<string>("");

  return (
    <div>
      <SectionHeader
        title="Admin Dashboard"
        subtitle="Overview of platform performance and activities"
      />

      <GridStatsCard
        stats={stats}
      />

      <Row gutter={[24,24]}>
        <Col xs={24} lg={16}>
          <Card
            title="Recent Enrollments"
            extra={<Button type="primary">View All</Button>}
            className="mb-6 shadow-sm overflow-hidden"
          >
            <TableWithAction<RecentEnrollmentData>
              columns={enrollmentColumns}
              dataSource={recentEnrollments}
              pagination={{ pageSize: 5 }}
              size="small"
              searchText={searchText}
              setSearchText={setSearchText}
            />
          </Card>

          <Row gutter={[24, 24]} className="mt-3" >
            <Col xs={24} md={12}>
              <Card 
                title="Top Performing Courses"
                extra={<Button type="primary">View All</Button>}
                className="shadow-sm"
                
              >
                <AvatarLists
                  data={topCourses}
                  getIcon={() => <BookOutlined style={{backgroundColor:"#1890ff"}} />}
                  getTitle={item => item.title}
                  getDescription={item => (
                    <div>
                      <div className="flex items-center justify-between">
                        <span>Enrollments: {item.enrollments}</span>
                        <span className="flex items-center">
                          {item.rating} <StarOutlined style={{ color: "#faad14"}} />
                        </span>
                      </div>
                      <div>
                        Revenue: ${item.revenue.toLocaleString(undefined,{
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </div>
                    </div>
                  )}
                />
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card
                title="Upcoming Events"
                extra={<Button type="primary">View All</Button>}
                className="shadow-sm"
              >
                <AvatarLists
                  data={upcomingEvents}
                  getIcon={() => <CalendarOutlined style={{ backgroundColor: "#52c41a" }} />}
                  getTitle={item=>(
                    <div className="flex items-center justify-between">
                      <span>{item.title}</span>
                      {getEventTypeTag(item.type)}
                    </div>
                  )}
                  getDescription={item=>(
                    <div className="flex items-center">
                      <CalendarOutlined className="mr-1"/>
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </Col>
        
        <Col xs={24} lg={8} >
          <Card
            title="Notifications"
            className="shadow-sm mb-6"
            extra={<Button type="primary">View All</Button>}
          >
            <AvatarLists
              data={notifications}
              getIcon={item=>getNotificationIcon(item.type)}
              getTitle={item => item.title}
              getDescription={item=>(
                <div>
                  <div>{item.description}</div>
                  <div className="text-xs text-gray-500 mt-1">{item.time}</div>
                </div>
              )}
            />
          </Card>
          <Card 
            title="Recent Activities" 
            extra={<Button type="primary">View All</Button>}
            className="shadow-sm "
          >
            <AvatarLists
              data={recentActivities}
              getIcon={item => getActivityIcon(item.type)}
              getTitle={item => (
                <span>
                  <Text strong>{item.user}</Text> {item.action}
                </span>
              )}
              getDescription={item=>(
                <div className="text-xs text-gray-500">{item.time}</div>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Calendar" className="shadow-sm !mt-8">
        <CalendarEvents dateCellRender={dateCellRender} />
      </Card>



    </div>

  
  )
}

export default AdminDashboard
