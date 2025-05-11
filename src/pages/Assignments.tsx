"use client"

import type React from "react"
import { useState } from "react"
import { Typography, Tabs, List, Tag, Button, Progress, Card, Badge, Space, Divider, Empty } from "antd"
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
  CalendarOutlined,
} from "@ant-design/icons"

const { Title, Text, Paragraph } = Typography
const { TabPane } = Tabs

interface AssignmentProps {
  id: number
  title: string
  course: string
  dueDate: string
  status: "pending" | "submitted" | "graded" | "overdue"
  grade?: number
  maxGrade?: number
  description?: string
}

const Assignments: React.FC = () => {
  const [activeTab, setActiveTab] = useState("pending")

  // Sample data
  const assignments: AssignmentProps[] = [
    {
      id: 1,
      title: "React Component Project",
      course: "Introduction to React",
      dueDate: "2023-05-20",
      status: "pending",
      description:
        "Create a reusable component library with at least 5 different components. Each component should be well-documented and include prop validation.",
    },
    {
      id: 2,
      title: "JavaScript Algorithms",
      course: "Advanced JavaScript Concepts",
      dueDate: "2023-05-18",
      status: "pending",
      description:
        "Implement three different sorting algorithms and compare their performance with different input sizes.",
    },
    {
      id: 3,
      title: "UI Design Mockup",
      course: "UI/UX Design Fundamentals",
      dueDate: "2023-05-10",
      status: "overdue",
      description:
        "Create a high-fidelity mockup for a mobile app dashboard following the design principles discussed in class.",
    },
    {
      id: 4,
      title: "HTML Structure Exercise",
      course: "HTML & CSS Basics",
      dueDate: "2023-04-25",
      status: "submitted",
      description: "Build a semantic HTML structure for a blog website with proper accessibility considerations.",
    },
    {
      id: 5,
      title: "Python Data Analysis",
      course: "Introduction to Python",
      dueDate: "2023-04-15",
      status: "graded",
      grade: 92,
      maxGrade: 100,
      description: "Analyze the provided dataset using pandas and create visualizations to present your findings.",
    },
  ]

  const getStatusTag = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Tag icon={<ClockCircleOutlined />} color="processing">
            Pending
          </Tag>
        )
      case "submitted":
        return (
          <Tag icon={<CheckCircleOutlined />} color="warning">
            Submitted
          </Tag>
        )
      case "graded":
        return (
          <Tag icon={<CheckCircleOutlined />} color="success">
            Graded
          </Tag>
        )
      case "overdue":
        return (
          <Tag icon={<ExclamationCircleOutlined />} color="error">
            Overdue
          </Tag>
        )
      default:
        return <Tag color="default">{status}</Tag>
    }
  }

  const filteredAssignments = assignments.filter((assignment) => {
    if (activeTab === "all") return true
    return assignment.status === activeTab
  })

  return (
    <div>
      <Title level={2}>Assignments</Title>
      <Text type="secondary" className="block mb-6">
        Track and manage your course assignments
      </Text>

      <Tabs activeKey={activeTab} onChange={setActiveTab} className="mb-6">
        <TabPane
          tab={
            <Badge count={assignments.filter((a) => a.status === "pending").length} offset={[10, 0]}>
              <span>Pending</span>
            </Badge>
          }
          key="pending"
        />
        <TabPane
          tab={
            <Badge count={assignments.filter((a) => a.status === "submitted").length} offset={[10, 0]}>
              <span>Submitted</span>
            </Badge>
          }
          key="submitted"
        />
        <TabPane
          tab={
            <Badge count={assignments.filter((a) => a.status === "graded").length} offset={[10, 0]}>
              <span>Graded</span>
            </Badge>
          }
          key="graded"
        />
        <TabPane
          tab={
            <Badge
              count={assignments.filter((a) => a.status === "overdue").length}
              offset={[10, 0]}
              style={{ backgroundColor: "#ff4d4f" }}
            >
              <span>Overdue</span>
            </Badge>
          }
          key="overdue"
        />
        <TabPane tab="All" key="all" />
      </Tabs>

      {filteredAssignments.length > 0 ? (
        <List
          itemLayout="vertical"
          dataSource={filteredAssignments}
          renderItem={(assignment) => (
            <Card className="mb-4" key={assignment.id}>
              <List.Item
                actions={[
                  <Button type="primary" key="submitButton">
                    {assignment.status === "pending" || assignment.status === "overdue"
                      ? "Submit Assignment"
                      : assignment.status === "submitted"
                        ? "View Submission"
                        : "View Feedback"}
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={
                    <div className="flex justify-between items-start">
                      <Title level={4}>{assignment.title}</Title>
                      {getStatusTag(assignment.status)}
                    </div>
                  }
                  description={
                    <Space direction="vertical" size="small">
                      <Text>
                        Course: <Text strong>{assignment.course}</Text>
                      </Text>
                      <div className="flex items-center">
                        <CalendarOutlined className="mr-1" />
                        <Text type={assignment.status === "overdue" ? "danger" : "secondary"}>
                          Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </Text>
                      </div>
                    </Space>
                  }
                />

                <Divider className="my-3" />

                <div>
                  <div className="flex items-center mb-2">
                    <FileTextOutlined className="mr-2" />
                    <Text strong>Assignment Description</Text>
                  </div>
                  <Paragraph>{assignment.description}</Paragraph>
                </div>

                {assignment.status === "graded" && (
                  <div className="mt-4">
                    <Text strong>Grade: </Text>
                    <Text>
                      {assignment.grade}/{assignment.maxGrade}
                    </Text>
                    <Progress
                      percent={(assignment.grade! / assignment.maxGrade!) * 100}
                      status={assignment.grade! >= 70 ? "success" : "exception"}
                      strokeColor={assignment.grade! >= 70 ? "#52c41a" : "#ff4d4f"}
                    />
                  </div>
                )}
              </List.Item>
            </Card>
          )}
        />
      ) : (
        <Empty description={`No ${activeTab} assignments`} />
      )}
    </div>
  )
}

export default Assignments
