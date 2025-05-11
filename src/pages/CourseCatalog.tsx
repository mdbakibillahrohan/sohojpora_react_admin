"use client"

import type React from "react"
import { useState } from "react"
import { Row, Col, Card, Typography, Input, Select, Tag, Rate, Button, Pagination, Empty } from "antd"
import { SearchOutlined, FilterOutlined } from "@ant-design/icons"

const { Title, Text } = Typography
const { Search } = Input
const { Option } = Select

interface CourseProps {
  id: number
  title: string
  instructor: string
  rating: number
  thumbnail: string
  category: string
  price: number
  level: string
}

const CourseCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)

  // Sample data
  const courses: CourseProps[] = [
    {
      id: 1,
      title: "Introduction to React",
      instructor: "John Doe",
      rating: 4.5,
      thumbnail: "/placeholder.svg?height=150&width=280",
      category: "Web Development",
      price: 49.99,
      level: "Beginner",
    },
    {
      id: 2,
      title: "Advanced JavaScript Concepts",
      instructor: "Jane Smith",
      rating: 4.8,
      thumbnail: "/placeholder.svg?height=150&width=280",
      category: "Programming",
      price: 69.99,
      level: "Advanced",
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      instructor: "Mike Johnson",
      rating: 4.2,
      thumbnail: "/placeholder.svg?height=150&width=280",
      category: "Design",
      price: 59.99,
      level: "Intermediate",
    },
    {
      id: 4,
      title: "Python for Data Science",
      instructor: "Emily Chen",
      rating: 4.7,
      thumbnail: "/placeholder.svg?height=150&width=280",
      category: "Data Science",
      price: 79.99,
      level: "Intermediate",
    },
    {
      id: 5,
      title: "Machine Learning Basics",
      instructor: "David Wilson",
      rating: 4.6,
      thumbnail: "/placeholder.svg?height=150&width=280",
      category: "Data Science",
      price: 89.99,
      level: "Advanced",
    },
    {
      id: 6,
      title: "HTML & CSS for Beginners",
      instructor: "Sarah Williams",
      rating: 4.3,
      thumbnail: "/placeholder.svg?height=150&width=280",
      category: "Web Development",
      price: 39.99,
      level: "Beginner",
    },
  ]

  // Filter courses based on search term and filters
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || course.category === selectedCategory
    const matchesLevel = !selectedLevel || course.level === selectedLevel

    return matchesSearch && matchesCategory && matchesLevel
  })

  const categories = [...new Set(courses.map((course) => course.category))]
  const levels = [...new Set(courses.map((course) => course.level))]

  return (
    <div>
      <Title level={2}>Course Catalog</Title>
      <Text type="secondary" className="block mb-6">
        Discover new courses and expand your knowledge
      </Text>

      <Row gutter={[24, 24]} className="mb-6">
        <Col xs={24} md={12}>
          <Search
            placeholder="Search courses or instructors"
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={(value) => setSearchTerm(value)}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col xs={12} md={6}>
          <Select
            placeholder={
              <>
                <FilterOutlined /> Category
              </>
            }
            style={{ width: "100%" }}
            allowClear
            size="large"
            onChange={(value) => setSelectedCategory(value)}
          >
            {categories.map((category) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </Col>
        <Col xs={12} md={6}>
          <Select
            placeholder={
              <>
                <FilterOutlined /> Level
              </>
            }
            style={{ width: "100%" }}
            allowClear
            size="large"
            onChange={(value) => setSelectedLevel(value)}
          >
            {levels.map((level) => (
              <Option key={level} value={level}>
                {level}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>

      {filteredCourses.length > 0 ? (
        <>
          <Row gutter={[24, 24]}>
            {filteredCourses.map((course) => (
              <Col xs={24} sm={12} lg={8} key={course.id}>
                <Card
                  hoverable
                  className="h-full"
                  cover={<img alt={course.title} src={course.thumbnail || "/placeholder.svg"} />}
                >
                  <Tag color="blue" className="mb-2">
                    {course.category}
                  </Tag>
                  <Tag color="green">{course.level}</Tag>
                  <Title level={4} className="mt-2">
                    {course.title}
                  </Title>
                  <Text type="secondary">Instructor: {course.instructor}</Text>

                  <div className="flex justify-between items-center mt-4">
                    <Rate disabled defaultValue={course.rating} allowHalf />
                    <Text strong>${course.price}</Text>
                  </div>

                  <Button type="primary" block className="mt-4">
                    Enroll Now
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="flex justify-center mt-8">
            <Pagination defaultCurrent={1} total={filteredCourses.length} pageSize={6} />
          </div>
        </>
      ) : (
        <Empty description="No courses found matching your criteria" className="py-12" />
      )}
    </div>
  )
}

export default CourseCatalog
