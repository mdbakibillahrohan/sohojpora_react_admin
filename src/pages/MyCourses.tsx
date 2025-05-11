import type React from "react"
import { Row, Col, Card, Typography, Progress, Tag, Button, Tabs, Empty } from "antd"
import { BookOutlined, CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons"

const { Title, Text } = Typography
const { TabPane } = Tabs

interface CourseProps {
  id: number
  title: string
  instructor: string
  progress: number
  thumbnail: string
  category: string
  completed?: boolean
}

const MyCourses: React.FC = () => {
  // Sample data
  const activeCourses: CourseProps[] = [
    {
      id: 1,
      title: "Introduction to React",
      instructor: "John Doe",
      progress: 65,
      thumbnail: "/placeholder.svg?height=150&width=280",
      category: "Web Development",
    },
    {
      id: 2,
      title: "Advanced JavaScript Concepts",
      instructor: "Jane Smith",
      progress: 32,
      thumbnail: "/placeholder.svg?height=150&width=280",
      category: "Programming",
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      instructor: "Mike Johnson",
      progress: 78,
      thumbnail: "/placeholder.svg?height=150&width=280",
      category: "Design",
    },
  ]

  const completedCourses: CourseProps[] = [
    {
      id: 4,
      title: "HTML & CSS Basics",
      instructor: "Sarah Williams",
      progress: 100,
      thumbnail: "/placeholder.svg?height=150&width=280",
      category: "Web Development",
      completed: true,
    },
    {
      id: 5,
      title: "Introduction to Python",
      instructor: "Robert Brown",
      progress: 100,
      thumbnail: "/placeholder.svg?height=150&width=280",
      category: "Programming",
      completed: true,
    },
  ]

  const CourseCard = ({ course }: { course: CourseProps }) => (
    <Card hoverable className="h-full" cover={<img alt={course.title} src={course.thumbnail || "/placeholder.svg"} />}>
      <Tag color="blue" className="mb-2">
        {course.category}
      </Tag>
      <Title level={4}>{course.title}</Title>
      <Text type="secondary">Instructor: {course.instructor}</Text>

      {!course.completed ? (
        <>
          <Progress percent={course.progress} status="active" className="mt-4" />
          <Button type="primary" block className="mt-4">
            Continue Learning
          </Button>
        </>
      ) : (
        <div className="flex items-center mt-4 text-green-600">
          <CheckCircleOutlined className="mr-2" />
          <span>Completed</span>
        </div>
      )}
    </Card>
  )

  return (
    <div>
      <Title level={2}>My Courses</Title>
      <Text type="secondary" className="block mb-6">
        Track and manage your enrolled courses
      </Text>

      <Tabs defaultActiveKey="active">
        <TabPane
          tab={
            <span>
              <ClockCircleOutlined /> Active Courses
            </span>
          }
          key="active"
        >
          <Row gutter={[24, 24]} className="mt-4">
            {activeCourses.map((course) => (
              <Col xs={24} sm={12} lg={8} key={course.id}>
                <CourseCard course={course} />
              </Col>
            ))}
          </Row>
        </TabPane>

        <TabPane
          tab={
            <span>
              <CheckCircleOutlined /> Completed
            </span>
          }
          key="completed"
        >
          {completedCourses.length > 0 ? (
            <Row gutter={[24, 24]} className="mt-4">
              {completedCourses.map((course) => (
                <Col xs={24} sm={12} lg={8} key={course.id}>
                  <CourseCard course={course} />
                </Col>
              ))}
            </Row>
          ) : (
            <Empty description="You haven't completed any courses yet" className="py-12" />
          )}
        </TabPane>

        <TabPane
          tab={
            <span>
              <BookOutlined /> Archived
            </span>
          }
          key="archived"
        >
          <Empty description="No archived courses" className="py-12" />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default MyCourses
