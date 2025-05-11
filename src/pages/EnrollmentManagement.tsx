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
  DatePicker,
  Tooltip,
  Badge,
  Tabs,
  Statistic,
  Row,
  Col,
  Divider,
  Progress,
} from "antd"
import {
  SearchOutlined,
  PlusOutlined,
  MoreOutlined,
  FilterOutlined,
  ExportOutlined,
  BookOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"

const { Title, Text } = Typography
const { Option } = Select
const { TabPane } = Tabs
const { RangePicker } = DatePicker

interface EnrollmentData {
  key: string
  id: string
  student: string
  email: string
  course: string
  enrollDate: string
  expiryDate: string
  progress: number
  status: string
  paymentStatus: string
  amount: number
}

const EnrollmentManagement: React.FC = () => {
  const [searchText, setSearchText] = useState("")
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [activeTab, setActiveTab] = useState("all")

  // Sample data
  const enrollments: EnrollmentData[] = [
    {
      key: "1",
      id: "ENR001",
      student: "John Smith",
      email: "john.smith@example.com",
      course: "Advanced React Development",
      enrollDate: "2023-04-15",
      expiryDate: "2024-04-15",
      progress: 65,
      status: "Active",
      paymentStatus: "Paid",
      amount: 79.99,
    },
    {
      key: "2",
      id: "ENR002",
      student: "Emily Johnson",
      email: "emily.j@example.com",
      course: "Data Science Fundamentals",
      enrollDate: "2023-03-20",
      expiryDate: "2024-03-20",
      progress: 32,
      status: "Active",
      paymentStatus: "Paid",
      amount: 59.99,
    },
    {
      key: "3",
      id: "ENR003",
      student: "Michael Brown",
      email: "michael.b@example.com",
      course: "UI/UX Design Masterclass",
      enrollDate: "2023-02-10",
      expiryDate: "2024-02-10",
      progress: 78,
      status: "Active",
      paymentStatus: "Paid",
      amount: 69.99,
    },
    {
      key: "4",
      id: "ENR004",
      student: "Sarah Wilson",
      email: "sarah.w@example.com",
      course: "Python for Machine Learning",
      enrollDate: "2023-05-01",
      expiryDate: "2024-05-01",
      progress: 12,
      status: "Active",
      paymentStatus: "Paid",
      amount: 89.99,
    },
    {
      key: "5",
      id: "ENR005",
      student: "David Lee",
      email: "david.lee@example.com",
      course: "Full Stack Web Development",
      enrollDate: "2023-01-15",
      expiryDate: "2024-01-15",
      progress: 100,
      status: "Completed",
      paymentStatus: "Paid",
      amount: 99.99,
    },
    {
      key: "6",
      id: "ENR006",
      student: "Jennifer Garcia",
      email: "jennifer.g@example.com",
      course: "JavaScript Fundamentals",
      enrollDate: "2023-04-25",
      expiryDate: "2024-04-25",
      progress: 0,
      status: "Not Started",
      paymentStatus: "Pending",
      amount: 49.99,
    },
    {
      key: "7",
      id: "ENR007",
      student: "Robert Martinez",
      email: "robert.m@example.com",
      course: "Mobile App Development with React Native",
      enrollDate: "2023-03-10",
      expiryDate: "2024-03-10",
      progress: 45,
      status: "Active",
      paymentStatus: "Paid",
      amount: 79.99,
    },
    {
      key: "8",
      id: "ENR008",
      student: "Lisa Anderson",
      email: "lisa.a@example.com",
      course: "Advanced SQL for Data Analysis",
      enrollDate: "2023-02-20",
      expiryDate: "2024-02-20",
      progress: 88,
      status: "Active",
      paymentStatus: "Paid",
      amount: 69.99,
    },
    {
      key: "9",
      id: "ENR009",
      student: "James Taylor",
      email: "james.t@example.com",
      course: "Digital Marketing Essentials",
      enrollDate: "2023-01-05",
      expiryDate: "2024-01-05",
      progress: 100,
      status: "Completed",
      paymentStatus: "Paid",
      amount: 59.99,
    },
    {
      key: "10",
      id: "ENR010",
      student: "Patricia Thomas",
      email: "patricia.t@example.com",
      course: "Graphic Design Principles",
      enrollDate: "2023-05-05",
      expiryDate: "2023-06-05",
      progress: 0,
      status: "Expired",
      paymentStatus: "Refunded",
      amount: 0,
    },
  ]

  const filteredEnrollments = enrollments.filter((enrollment) => {
    if (activeTab === "all") return true
    if (activeTab === "active") return enrollment.status === "Active"
    if (activeTab === "completed") return enrollment.status === "Completed"
    if (activeTab === "notStarted") return enrollment.status === "Not Started"
    if (activeTab === "expired") return enrollment.status === "Expired"
    return true
  })

  const columns: ColumnsType<EnrollmentData> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: "Student",
      dataIndex: "student",
      key: "student",
      render: (text, record) => (
        <div>
          <div>{text}</div>
          <div className="text-xs text-gray-500">{record.email}</div>
        </div>
      ),
      sorter: (a, b) => a.student.localeCompare(b.student),
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) => {
        return (
          record.student.toLowerCase().includes(value.toString().toLowerCase()) ||
          record.email.toLowerCase().includes(value.toString().toLowerCase()) ||
          record.course.toLowerCase().includes(value.toString().toLowerCase()) ||
          record.id.toLowerCase().includes(value.toString().toLowerCase())
        )
      },
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
      sorter: (a, b) => a.course.localeCompare(b.course),
    },
    {
      title: "Enrollment Date",
      dataIndex: "enrollDate",
      key: "enrollDate",
      sorter: (a, b) => new Date(a.enrollDate).getTime() - new Date(b.enrollDate).getTime(),
      responsive: ["md"],
    },
    {
      title: "Progress",
      dataIndex: "progress",
      key: "progress",
      render: (progress) => <Progress percent={progress} size="small" />,
      sorter: (a, b) => a.progress - b.progress,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "default"
        let icon = null

        if (status === "Active") {
          color = "processing"
          icon = <ClockCircleOutlined />
        } else if (status === "Completed") {
          color = "success"
          icon = <CheckCircleOutlined />
        } else if (status === "Not Started") {
          color = "warning"
          icon = <ClockCircleOutlined />
        } else if (status === "Expired") {
          color = "error"
          icon = <ClockCircleOutlined />
        }

        return (
          <Tag color={color} icon={icon}>
            {status}
          </Tag>
        )
      },
      filters: [
        { text: "Active", value: "Active" },
        { text: "Completed", value: "Completed" },
        { text: "Not Started", value: "Not Started" },
        { text: "Expired", value: "Expired" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Payment",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (paymentStatus, record) => {
        let color = "default"

        if (paymentStatus === "Paid") {
          color = "success"
        } else if (paymentStatus === "Pending") {
          color = "warning"
        } else if (paymentStatus === "Refunded") {
          color = "error"
        }

        return (
          <div>
            <Tag color={color}>{paymentStatus}</Tag>
            <div className="text-xs mt-1">${record.amount.toFixed(2)}</div>
          </div>
        )
      },
      filters: [
        { text: "Paid", value: "Paid" },
        { text: "Pending", value: "Pending" },
        { text: "Refunded", value: "Refunded" },
      ],
      onFilter: (value, record) => record.paymentStatus === value,
      responsive: ["lg"],
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              { key: "1", label: "View Details" },
              { key: "2", label: "Edit Enrollment" },
              { key: "3", label: "Send Reminder" },
              { type: "divider" },
              {
                key: "4",
                label: record.status === "Active" ? "Mark as Completed" : "Mark as Active",
              },
              { key: "5", label: "Process Refund", danger: true },
              { key: "6", label: "Cancel Enrollment", danger: true },
            ],
          }}
          trigger={["click"]}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
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
        console.log("New enrollment:", values)
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={2} className="mb-0">
            Enrollment Management
          </Title>
          <Text type="secondary">Manage student enrollments and course access</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Add Enrollment
        </Button>
      </div>

      {/* Stats Cards */}
      <Row gutter={[24, 24]} className="mb-6">
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-sm text-center">
            <Statistic title="Total Enrollments" value={enrollments.length} prefix={<BookOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-sm text-center">
            <Statistic
              title="Active Enrollments"
              value={enrollments.filter((e) => e.status === "Active").length}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-sm text-center">
            <Statistic
              title="Completion Rate"
              value={Math.round(
                (enrollments.filter((e) => e.status === "Completed").length / enrollments.length) * 100,
              )}
              suffix="%"
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-sm text-center">
            <Statistic
              title="Total Revenue"
              value={enrollments.reduce((sum, enrollment) => sum + enrollment.amount, 0)}
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
              <Badge count={enrollments.length}>
                <span className="pr-4">All Enrollments</span>
              </Badge>
            }
            key="all"
          />
          <TabPane
            tab={
              <Badge count={enrollments.filter((e) => e.status === "Active").length}>
                <span className="pr-4">Active</span>
              </Badge>
            }
            key="active"
          />
          <TabPane
            tab={
              <Badge count={enrollments.filter((e) => e.status === "Completed").length}>
                <span className="pr-4">Completed</span>
              </Badge>
            }
            key="completed"
          />
          <TabPane
            tab={
              <Badge count={enrollments.filter((e) => e.status === "Not Started").length}>
                <span className="pr-4">Not Started</span>
              </Badge>
            }
            key="notStarted"
          />
          <TabPane
            tab={
              <Badge count={enrollments.filter((e) => e.status === "Expired").length}>
                <span className="pr-4">Expired</span>
              </Badge>
            }
            key="expired"
          />
        </Tabs>

        <Divider className="my-4" />

        <div className="flex justify-between mb-4 flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search by student, email, course or ID"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ maxWidth: 400 }}
            allowClear
          />
          <Space>
            <RangePicker placeholder={["Start Date", "End Date"]} />
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
              <Text>{`Selected ${selectedRowKeys.length} enrollments`}</Text>
              <Space>
                <Button size="small">Send Email</Button>
                <Button size="small">Extend Access</Button>
                <Button size="small" danger>
                  Cancel Selected
                </Button>
              </Space>
            </div>
          )}
        </div>

        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredEnrollments}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} enrollments`,
          }}
          scroll={{ x: "max-content" }}
        />
      </Card>

      <Modal title="Add New Enrollment" open={isModalVisible} onCancel={handleCancel} onOk={handleCreate} width={600}>
        <Form form={form} layout="vertical" initialValues={{ status: "Active", paymentStatus: "Paid" }}>
          <Form.Item name="student" label="Student" rules={[{ required: true, message: "Please select a student" }]}>
            <Select showSearch placeholder="Select a student" optionFilterProp="children">
              <Option value="John Smith">John Smith (john.smith@example.com)</Option>
              <Option value="Emily Johnson">Emily Johnson (emily.j@example.com)</Option>
              <Option value="Michael Brown">Michael Brown (michael.b@example.com)</Option>
              <Option value="Sarah Wilson">Sarah Wilson (sarah.w@example.com)</Option>
              <Option value="David Lee">David Lee (david.lee@example.com)</Option>
            </Select>
          </Form.Item>

          <Form.Item name="course" label="Course" rules={[{ required: true, message: "Please select a course" }]}>
            <Select showSearch placeholder="Select a course" optionFilterProp="children">
              <Option value="Advanced React Development">Advanced React Development</Option>
              <Option value="Data Science Fundamentals">Data Science Fundamentals</Option>
              <Option value="UI/UX Design Masterclass">UI/UX Design Masterclass</Option>
              <Option value="Python for Machine Learning">Python for Machine Learning</Option>
              <Option value="Full Stack Web Development">Full Stack Web Development</Option>
            </Select>
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="enrollDate"
                label="Enrollment Date"
                rules={[{ required: true, message: "Please select enrollment date" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="expiryDate"
                label="Expiry Date"
                rules={[{ required: true, message: "Please select expiry date" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="status" label="Status" rules={[{ required: true, message: "Please select a status" }]}>
                <Select placeholder="Select a status">
                  <Option value="Active">Active</Option>
                  <Option value="Not Started">Not Started</Option>
                  <Option value="Completed">Completed</Option>
                  <Option value="Expired">Expired</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="paymentStatus"
                label="Payment Status"
                rules={[{ required: true, message: "Please select payment status" }]}
              >
                <Select placeholder="Select payment status">
                  <Option value="Paid">Paid</Option>
                  <Option value="Pending">Pending</Option>
                  <Option value="Refunded">Refunded</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="amount" label="Amount ($)" rules={[{ required: true, message: "Please enter amount" }]}>
            <Input type="number" prefix="$" placeholder="79.99" />
          </Form.Item>

          <Form.Item name="notes" label="Notes">
            <Input.TextArea rows={3} placeholder="Additional notes about this enrollment" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default EnrollmentManagement
