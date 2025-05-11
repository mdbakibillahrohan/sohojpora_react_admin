"use client"

import type React from "react"
import { useState } from "react"
import {
  Card,
  Typography,
  Table,
  Button,
  Input,
  Space,
  Tag,
  Dropdown,
  Modal,
  Form,
  Select,
  Tooltip,
  Badge,
  Tabs,
  Statistic,
  Row,
  Col,
  Divider,
  Upload,
  Switch,
  InputNumber,
  Progress,
} from "antd"
import {
  SearchOutlined,
  PlusOutlined,
  MoreOutlined,
  FilterOutlined,
  ExportOutlined,
  BookOutlined,
  EyeOutlined,
  EditOutlined,
  UploadOutlined,
  DollarOutlined,
  StarOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import type { UploadProps } from "antd"

const { Title, Text } = Typography
const { Option } = Select
const { TabPane } = Tabs
const { TextArea } = Input

interface CourseData {
  key: string
  id: string
  title: string
  instructor: string
  category: string
  level: string
  price: number
  status: string
  students: number
  rating: number
  createdAt: string
  lastUpdated: string
  progress: number
}

const CourseManagement: React.FC = () => {
  const [searchText, setSearchText] = useState("")
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [activeTab, setActiveTab] = useState("all")

  // Sample data
  const courses: CourseData[] = [
    {
      key: "1",
      id: "CRS001",
      title: "Advanced React Development",
      instructor: "John Doe",
      category: "Web Development",
      level: "Advanced",
      price: 79.99,
      status: "Published",
      students: 1245,
      rating: 4.8,
      createdAt: "2022-10-15",
      lastUpdated: "2023-04-20",
      progress: 100,
    },
    {
      key: "2",
      id: "CRS002",
      title: "Data Science Fundamentals",
      instructor: "Jane Smith",
      category: "Data Science",
      level: "Beginner",
      price: 59.99,
      status: "Published",
      students: 980,
      rating: 4.7,
      createdAt: "2022-11-05",
      lastUpdated: "2023-03-15",
      progress: 100,
    },
    {
      key: "3",
      id: "CRS003",
      title: "UI/UX Design Masterclass",
      instructor: "Mike Johnson",
      category: "Design",
      level: "Intermediate",
      price: 69.99,
      status: "Published",
      students: 875,
      rating: 4.9,
      createdAt: "2022-09-20",
      lastUpdated: "2023-05-01",
      progress: 100,
    },
    {
      key: "4",
      id: "CRS004",
      title: "Python for Machine Learning",
      instructor: "Emily Chen",
      category: "Data Science",
      level: "Intermediate",
      price: 89.99,
      status: "Published",
      students: 760,
      rating: 4.6,
      createdAt: "2023-01-10",
      lastUpdated: "2023-04-25",
      progress: 100,
    },
    {
      key: "5",
      id: "CRS005",
      title: "Full Stack Web Development",
      instructor: "Robert Wilson",
      category: "Web Development",
      level: "Intermediate",
      price: 99.99,
      status: "Published",
      students: 690,
      rating: 4.5,
      createdAt: "2022-12-05",
      lastUpdated: "2023-03-30",
      progress: 100,
    },
    {
      key: "6",
      id: "CRS006",
      title: "JavaScript Fundamentals",
      instructor: "Sarah Williams",
      category: "Web Development",
      level: "Beginner",
      price: 49.99,
      status: "Draft",
      students: 0,
      rating: 0,
      createdAt: "2023-04-15",
      lastUpdated: "2023-05-02",
      progress: 75,
    },
    {
      key: "7",
      id: "CRS007",
      title: "Mobile App Development with React Native",
      instructor: "John Doe",
      category: "Mobile Development",
      level: "Intermediate",
      price: 79.99,
      status: "Review",
      students: 0,
      rating: 0,
      createdAt: "2023-03-20",
      lastUpdated: "2023-04-28",
      progress: 90,
    },
    {
      key: "8",
      id: "CRS008",
      title: "Advanced SQL for Data Analysis",
      instructor: "Emily Chen",
      category: "Data Science",
      level: "Advanced",
      price: 69.99,
      status: "Draft",
      students: 0,
      rating: 0,
      createdAt: "2023-04-05",
      lastUpdated: "2023-05-03",
      progress: 60,
    },
    {
      key: "9",
      id: "CRS009",
      title: "Digital Marketing Essentials",
      instructor: "Lisa Anderson",
      category: "Marketing",
      level: "Beginner",
      price: 59.99,
      status: "Published",
      students: 320,
      rating: 4.3,
      createdAt: "2023-02-10",
      lastUpdated: "2023-04-15",
      progress: 100,
    },
    {
      key: "10",
      id: "CRS010",
      title: "Graphic Design Principles",
      instructor: "Mike Johnson",
      category: "Design",
      level: "Beginner",
      price: 54.99,
      status: "Archived",
      students: 450,
      rating: 4.2,
      createdAt: "2022-08-15",
      lastUpdated: "2023-01-20",
      progress: 100,
    },
  ]

  const filteredCourses = courses.filter((course) => {
    if (activeTab === "all") return true
    if (activeTab === "published") return course.status === "Published"
    if (activeTab === "draft") return course.status === "Draft"
    if (activeTab === "review") return course.status === "Review"
    if (activeTab === "archived") return course.status === "Archived"
    return true
  })

  const columns: ColumnsType<CourseData> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: "Course",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center mr-2">
            <BookOutlined />
          </div>
          <div>
            <div className="font-medium">{text}</div>
            <div className="text-xs text-gray-500">By {record.instructor}</div>
          </div>
        </div>
      ),
      sorter: (a, b) => a.title.localeCompare(b.title),
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) => {
        return (
          record.title.toLowerCase().includes(value.toString().toLowerCase()) ||
          record.instructor.toLowerCase().includes(value.toString().toLowerCase()) ||
          record.id.toLowerCase().includes(value.toString().toLowerCase())
        )
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => <Tag color="blue">{category}</Tag>,
      filters: [
        { text: "Web Development", value: "Web Development" },
        { text: "Data Science", value: "Data Science" },
        { text: "Design", value: "Design" },
        { text: "Mobile Development", value: "Mobile Development" },
        { text: "Marketing", value: "Marketing" },
      ],
      onFilter: (value, record) => record.category === value,
      responsive: ["md"],
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      render: (level) => {
        let color = "default"
        if (level === "Beginner") color = "green"
        else if (level === "Intermediate") color = "blue"
        else if (level === "Advanced") color = "purple"

        return <Tag color={color}>{level}</Tag>
      },
      filters: [
        { text: "Beginner", value: "Beginner" },
        { text: "Intermediate", value: "Intermediate" },
        { text: "Advanced", value: "Advanced" },
      ],
      onFilter: (value, record) => record.level === value,
      responsive: ["lg"],
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price.toFixed(2)}`,
      sorter: (a, b) => a.price - b.price,
      responsive: ["md"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        let color = "default"
        let icon = null

        if (status === "Published") {
          color = "success"
          icon = <CheckCircleOutlined />
        } else if (status === "Draft") {
          color = "warning"
          icon = <ClockCircleOutlined />
        } else if (status === "Review") {
          color = "processing"
          icon = <EyeOutlined />
        } else if (status === "Archived") {
          color = "default"
          icon = <FileTextOutlined />
        }

        return (
          <div>
            <Tag color={color} icon={icon}>
              {status}
            </Tag>
            {status !== "Published" && record.progress < 100 && (
              <Progress percent={record.progress} size="small" className="mt-1" />
            )}
          </div>
        )
      },
      filters: [
        { text: "Published", value: "Published" },
        { text: "Draft", value: "Draft" },
        { text: "Review", value: "Review" },
        { text: "Archived", value: "Archived" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Students",
      dataIndex: "students",
      key: "students",
      sorter: (a, b) => a.students - b.students,
      responsive: ["lg"],
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) =>
        rating > 0 ? (
          <span className="flex items-center">
            {rating.toFixed(1)} <StarOutlined className="text-yellow-500 ml-1" />
          </span>
        ) : (
          <span className="text-gray-400">No ratings</span>
        ),
      sorter: (a, b) => a.rating - b.rating,
      responsive: ["lg"],
    },
    {
      title: "Last Updated",
      dataIndex: "lastUpdated",
      key: "lastUpdated",
      sorter: (a, b) => new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime(),
      responsive: ["xl"],
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Tooltip title="View">
            <Button type="text" icon={<EyeOutlined />} />
          </Tooltip>
          <Tooltip title="Edit">
            <Button type="text" icon={<EditOutlined />} onClick={() => navigate(`/courses/${record.id}`)} />
          </Tooltip>
          <Dropdown
            menu={{
              items: [
                { key: "1", label: "View Course" },
                { key: "2", label: "Edit Course" },
                { key: "3", label: "Duplicate Course" },
                { type: "divider" },
                {
                  key: "4",
                  label: record.status === "Published" ? "Unpublish" : "Publish",
                  danger: record.status === "Published",
                },
                { key: "5", label: "Archive Course" },
                { key: "6", label: "Delete Course", danger: true },
              ],
            }}
            trigger={["click"]}
          >
            <Button type="text" icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ]

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const handleCreate = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("New course:", values)
        setIsModalVisible(false)
        form.resetFields()
      })
      .catch((info) => {
        console.log("Validate Failed:", info)
      })
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const hasSelected = selectedRowKeys.length > 0

  const uploadProps: UploadProps = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === "done") {
        console.log(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === "error") {
        console.log(`${info.file.name} file upload failed.`)
      }
    },
  }

  // Mock function for navigation
  const navigate = (path: string) => {
    console.log(`Navigating to: ${path}`)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={2} className="mb-0">
            Course Management
          </Title>
          <Text type="secondary">Manage all courses, content, and curriculum</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Create Course
        </Button>
      </div>

      {/* Stats Cards */}
      <Row gutter={[24, 24]} className="mb-6">
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-sm text-center">
            <Statistic title="Total Courses" value={courses.length} prefix={<BookOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-sm text-center">
            <Statistic
              title="Published"
              value={courses.filter((c) => c.status === "Published").length}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-sm text-center">
            <Statistic
              title="Total Students"
              value={courses.reduce((sum, course) => sum + course.students, 0)}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-sm text-center">
            <Statistic
              title="Total Revenue"
              value={courses.reduce((sum, course) => sum + course.price * course.students, 0)}
              prefix="$"
              precision={2}
            />
          </Card>
        </Col>
      </Row>

      <Card bordered={false} className="shadow-sm">
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane
            tab={
              <Badge count={courses.length}>
                <span className="pr-4">All Courses</span>
              </Badge>
            }
            key="all"
          />
          <TabPane
            tab={
              <Badge count={courses.filter((c) => c.status === "Published").length}>
                <span className="pr-4">Published</span>
              </Badge>
            }
            key="published"
          />
          <TabPane
            tab={
              <Badge count={courses.filter((c) => c.status === "Draft").length}>
                <span className="pr-4">Drafts</span>
              </Badge>
            }
            key="draft"
          />
          <TabPane
            tab={
              <Badge count={courses.filter((c) => c.status === "Review").length}>
                <span className="pr-4">In Review</span>
              </Badge>
            }
            key="review"
          />
          <TabPane
            tab={
              <Badge count={courses.filter((c) => c.status === "Archived").length}>
                <span className="pr-4">Archived</span>
              </Badge>
            }
            key="archived"
          />
        </Tabs>

        <Divider className="my-4" />

        <div className="flex justify-between mb-4 flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search courses by title, instructor or ID"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ maxWidth: 400 }}
            allowClear
          />
          <Space>
            <Tooltip title="Filter">
              <Button icon={<FilterOutlined />}>Filter</Button>
            </Tooltip>
            <Tooltip title="Export">
              <Button icon={<ExportOutlined />}>Export</Button>
            </Tooltip>
          </Space>
        </div>

        <div className="mb-4">
          {hasSelected && (
            <div className="bg-blue-50 p-2 rounded flex justify-between items-center">
              <Text>{`Selected ${selectedRowKeys.length} courses`}</Text>
              <Space>
                <Button size="small">Bulk Edit</Button>
                <Button size="small" danger>
                  Delete Selected
                </Button>
              </Space>
            </div>
          )}
        </div>

        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredCourses}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} courses`,
          }}
          scroll={{ x: "max-content" }}
        />
      </Card>

      <Modal title="Create New Course" open={isModalVisible} onCancel={handleCancel} onOk={handleCreate} width={800}>
        <Form form={form} layout="vertical" initialValues={{ status: "Draft", level: "Beginner" }}>
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                name="title"
                label="Course Title"
                rules={[{ required: true, message: "Please enter course title" }]}
              >
                <Input placeholder="Enter course title" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="price"
                label="Price ($)"
                rules={[{ required: true, message: "Please enter course price" }]}
              >
                <InputNumber
                  min={0}
                  precision={2}
                  style={{ width: "100%" }}
                  prefix={<DollarOutlined />}
                  placeholder="49.99"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: "Please select a category" }]}
              >
                <Select placeholder="Select a category">
                  <Option value="Web Development">Web Development</Option>
                  <Option value="Data Science">Data Science</Option>
                  <Option value="Design">Design</Option>
                  <Option value="Mobile Development">Mobile Development</Option>
                  <Option value="Marketing">Marketing</Option>
                  <Option value="Business">Business</Option>
                  <Option value="Photography">Photography</Option>
                  <Option value="Music">Music</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="level" label="Level" rules={[{ required: true, message: "Please select a level" }]}>
                <Select placeholder="Select a level">
                  <Option value="Beginner">Beginner</Option>
                  <Option value="Intermediate">Intermediate</Option>
                  <Option value="Advanced">Advanced</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Course Description"
            rules={[{ required: true, message: "Please enter course description" }]}
          >
            <TextArea rows={4} placeholder="Enter course description" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="instructor"
                label="Instructor"
                rules={[{ required: true, message: "Please select an instructor" }]}
              >
                <Select placeholder="Select an instructor">
                  <Option value="John Doe">John Doe</Option>
                  <Option value="Jane Smith">Jane Smith</Option>
                  <Option value="Mike Johnson">Mike Johnson</Option>
                  <Option value="Emily Chen">Emily Chen</Option>
                  <Option value="Robert Wilson">Robert Wilson</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="status" label="Status" rules={[{ required: true, message: "Please select a status" }]}>
                <Select placeholder="Select a status">
                  <Option value="Draft">Draft</Option>
                  <Option value="Review">Review</Option>
                  <Option value="Published">Published</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="thumbnail" label="Course Thumbnail">
            <Upload {...uploadProps} listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
            </Upload>
          </Form.Item>

          <Form.Item name="featured" label="Featured Course" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CourseManagement
