"use client"

import type React from "react"
import { useParams } from "react-router-dom"
import { Row, Col, Typography, Card, Tabs, Button, List, Tag, Rate, Avatar, Progress, Divider, Empty } from "antd"
import {
  PlayCircleOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons"

const { Title, Text, Paragraph } = Typography
const { TabPane } = Tabs

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  // This would normally come from an API call using the id
  const course = {
    id: Number.parseInt(id || "1"),
    title: "Introduction to React",
    instructor: "John Doe",
    rating: 4.5,
    reviewCount: 128,
    thumbnail: "/placeholder.svg?height=300&width=600",
    category: "Web Development",
    price: 49.99,
    level: "Beginner",
    duration: "10 hours",
    enrolled: true,
    progress: 65,
    description:
      "Learn the fundamentals of React, including components, state, props, and hooks. This course will take you from beginner to confident React developer through hands-on projects and exercises.",
    whatYouWillLearn: [
      "Understand React fundamentals and JSX",
      "Build reusable components",
      "Manage state and props effectively",
      "Work with React Hooks",
      "Implement routing with React Router",
      "Connect to APIs and handle data",
      "Deploy your React applications",
    ],
    modules: [
      {
        title: "Getting Started with React",
        lessons: [
          { title: "Introduction to React", duration: "15 min", type: "video", completed: true },
          { title: "Setting Up Your Development Environment", duration: "20 min", type: "video", completed: true },
          { title: "Your First React Component", duration: "25 min", type: "video", completed: true },
          { title: "Module Quiz", duration: "10 min", type: "quiz", completed: true },
        ],
      },
      {
        title: "React Components and Props",
        lessons: [
          { title: "Component Types", duration: "20 min", type: "video", completed: true },
          { title: "Working with Props", duration: "25 min", type: "video", completed: true },
          { title: "Component Composition", duration: "30 min", type: "video", completed: false },
          { title: "Practice Exercise", duration: "45 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "15 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "State and Lifecycle",
        lessons: [
          { title: "Introduction to State", duration: "25 min", type: "video", completed: false },
          { title: "useState Hook", duration: "30 min", type: "video", completed: false },
          { title: "Component Lifecycle", duration: "35 min", type: "video", completed: false },
          { title: "useEffect Hook", duration: "40 min", type: "video", completed: false },
          { title: "Module Quiz", duration: "15 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Final Project",
        lessons: [
          { title: "Project Overview", duration: "15 min", type: "video", completed: false },
          { title: "Building the Project", duration: "120 min", type: "exercise", completed: false },
          { title: "Project Submission", duration: "30 min", type: "assignment", completed: false },
        ],
      },
    ],
  }

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return <PlayCircleOutlined />
      case "quiz":
        return <QuestionCircleOutlined />
      case "exercise":
      case "assignment":
        return <FileTextOutlined />
      default:
        return <FileTextOutlined />
    }
  }

  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <img
            src={course.thumbnail || "/placeholder.svg"}
            alt={course.title}
            style={{ width: "100%", borderRadius: "8px" }}
          />

          <div className="mt-6">
            <Title level={2}>{course.title}</Title>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Tag color="blue">{course.category}</Tag>
              <Tag color="green">{course.level}</Tag>
              <div className="flex items-center">
                <Rate disabled defaultValue={course.rating} allowHalf />
                <Text className="ml-2">({course.reviewCount} reviews)</Text>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <Avatar icon={<UserOutlined />} />
              <Text strong className="ml-2">
                Instructor: {course.instructor}
              </Text>
            </div>

            <Paragraph>{course.description}</Paragraph>
          </div>

          <Divider />

          <div className="mb-6">
            <Title level={3}>What You'll Learn</Title>
            <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={course.whatYouWillLearn}
              renderItem={(item) => (
                <List.Item key={item}>
                  <div className="flex items-start">
                    <CheckCircleOutlined className="mt-1 mr-2 text-green-500" />
                    <Text>{item}</Text>
                  </div>
                </List.Item>
              )}
            />
          </div>

          <Divider />

          <div>
            <Title level={3}>Course Content</Title>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Modules" key="1">
                {course.modules.map((module, index) => (
                  <Card key={index} title={module.title} className="mb-4" type="inner">
                    <List
                      itemLayout="horizontal"
                      dataSource={module.lessons}
                      renderItem={(lesson) => (
                        <List.Item
                          key={lesson.title}
                          actions={[
                            <div className="flex items-center">
                              <ClockCircleOutlined className="mr-1" />
                              <Text type="secondary">{lesson.duration}</Text>
                            </div>,
                            lesson.completed ? (
                              <Tag color="success" icon={<CheckCircleOutlined />}>
                                Completed
                              </Tag>
                            ) : (
                              <Button type="link" size="small">
                                Start
                              </Button>
                            ),
                          ]}
                        >
                          <List.Item.Meta
                            avatar={getLessonIcon(lesson.type)}
                            title={lesson.title}
                            description={<Tag color="default">{lesson.type}</Tag>}
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                ))}
              </TabPane>
              <TabPane tab="Reviews" key="2">
                <Empty description="No reviews yet" />
              </TabPane>
              <TabPane tab="Discussion" key="3">
                <Empty description="No discussions yet" />
              </TabPane>
            </Tabs>
          </div>
        </Col>

        <Col xs={24} lg={8}>
          <Card className="sticky top-24">
            {course.enrolled ? (
              <>
                <Title level={4}>Your Progress</Title>
                <Progress percent={course.progress} status="active" />
                <div className="flex items-center mt-4 mb-6">
                  <TrophyOutlined className="text-yellow-500 mr-2" />
                  <Text>Continue where you left off</Text>
                </div>
                <Button type="primary" size="large" block icon={<PlayCircleOutlined />}>
                  Continue Learning
                </Button>
              </>
            ) : (
              <>
                <Title level={4}>${course.price}</Title>
                <div className="flex items-center mb-4">
                  <ClockCircleOutlined className="mr-2" />
                  <Text>{course.duration} of content</Text>
                </div>
                <Button type="primary" size="large" block>
                  Enroll Now
                </Button>
                <Button type="default" size="large" block className="mt-3">
                  Add to Wishlist
                </Button>
              </>
            )}

            <Divider />

            <div>
              <Title level={5}>This course includes:</Title>
              <List
                itemLayout="horizontal"
                dataSource={[
                  { icon: <PlayCircleOutlined />, text: "10 hours on-demand video" },
                  { icon: <FileTextOutlined />, text: "5 downloadable resources" },
                  { icon: <QuestionCircleOutlined />, text: "4 quizzes" },
                  { icon: <TrophyOutlined />, text: "Certificate of completion" },
                ]}
                renderItem={(item) => (
                  <List.Item key={item.text}>
                    <div className="flex items-center">
                      {item.icon}
                      <Text className="ml-2">{item.text}</Text>
                    </div>
                  </List.Item>
                )}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default CourseDetail
