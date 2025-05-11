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
  Avatar,
  Tooltip,
  Badge,
  Tabs,
  Statistic,
  Row,
  Col,
  Divider,
} from "antd"
import {
  SearchOutlined,
  PlusOutlined,
  MoreOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  FilterOutlined,
  ExportOutlined,
  ImportOutlined,
  TeamOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"

const { Title, Text } = Typography
const { Option } = Select
const { TabPane } = Tabs

interface UserData {
  key: string
  id: string
  name: string
  email: string
  phone: string
  role: string
  status: string
  joinDate: string
  lastActive: string
  courses: number
}

const UserManagement: React.FC = () => {
  const [searchText, setSearchText] = useState("")
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [activeTab, setActiveTab] = useState("all")

  // Sample data
  const users: UserData[] = [
    {
      key: "1",
      id: "USR001",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      role: "Student",
      status: "Active",
      joinDate: "2023-01-15",
      lastActive: "2023-05-07",
      courses: 3,
    },
    {
      key: "2",
      id: "USR002",
      name: "Emily Johnson",
      email: "emily.j@example.com",
      phone: "+1 (555) 234-5678",
      role: "Instructor",
      status: "Active",
      joinDate: "2022-11-20",
      lastActive: "2023-05-06",
      courses: 5,
    },
    {
      key: "3",
      id: "USR003",
      name: "Michael Brown",
      email: "michael.b@example.com",
      phone: "+1 (555) 345-6789",
      role: "Student",
      status: "Inactive",
      joinDate: "2023-02-10",
      lastActive: "2023-04-15",
      courses: 2,
    },
    {
      key: "4",
      id: "USR004",
      name: "Sarah Wilson",
      email: "sarah.w@example.com",
      phone: "+1 (555) 456-7890",
      role: "Student",
      status: "Active",
      joinDate: "2023-03-05",
      lastActive: "2023-05-05",
      courses: 4,
    },
    {
      key: "5",
      id: "USR005",
      name: "David Lee",
      email: "david.lee@example.com",
      phone: "+1 (555) 567-8901",
      role: "Admin",
      status: "Active",
      joinDate: "2022-09-15",
      lastActive: "2023-05-07",
      courses: 0,
    },
    {
      key: "6",
      id: "USR006",
      name: "Jennifer Garcia",
      email: "jennifer.g@example.com",
      phone: "+1 (555) 678-9012",
      role: "Instructor",
      status: "Active",
      joinDate: "2022-10-20",
      lastActive: "2023-05-04",
      courses: 3,
    },
    {
      key: "7",
      id: "USR007",
      name: "Robert Martinez",
      email: "robert.m@example.com",
      phone: "+1 (555) 789-0123",
      role: "Student",
      status: "Pending",
      joinDate: "2023-04-25",
      lastActive: "2023-04-25",
      courses: 1,
    },
    {
      key: "8",
      id: "USR008",
      name: "Lisa Anderson",
      email: "lisa.a@example.com",
      phone: "+1 (555) 890-1234",
      role: "Student",
      status: "Active",
      joinDate: "2023-01-30",
      lastActive: "2023-05-03",
      courses: 6,
    },
    {
      key: "9",
      id: "USR009",
      name: "James Taylor",
      email: "james.t@example.com",
      phone: "+1 (555) 901-2345",
      role: "Instructor",
      status: "Active",
      joinDate: "2022-12-10",
      lastActive: "2023-05-06",
      courses: 2,
    },
    {
      key: "10",
      id: "USR010",
      name: "Patricia Thomas",
      email: "patricia.t@example.com",
      phone: "+1 (555) 012-3456",
      role: "Student",
      status: "Blocked",
      joinDate: "2023-02-15",
      lastActive: "2023-03-20",
      courses: 0,
    },
  ]

  const filteredUsers = users.filter((user) => {
    if (activeTab === "all") return true
    if (activeTab === "students") return user.role === "Student"
    if (activeTab === "instructors") return user.role === "Instructor"
    if (activeTab === "admins") return user.role === "Admin"
    if (activeTab === "active") return user.status === "Active"
    if (activeTab === "inactive")
      return user.status === "Inactive" || user.status === "Blocked" || user.status === "Pending"
    return true
  })

  const columns: ColumnsType<UserData> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center">
          <Avatar icon={<UserOutlined />} className="mr-2" />
          <div>
            <div>{text}</div>
            <div className="text-xs text-gray-500">{record.email}</div>
          </div>
        </div>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) => {
        return (
          record.name.toLowerCase().includes(value.toString().toLowerCase()) ||
          record.email.toLowerCase().includes(value.toString().toLowerCase()) ||
          record.id.toLowerCase().includes(value.toString().toLowerCase())
        )
      },
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      responsive: ["md"],
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        let color = "default"
        if (role === "Admin") color = "purple"
        else if (role === "Instructor") color = "blue"
        else if (role === "Student") color = "green"

        return <Tag color={color}>{role}</Tag>
      },
      filters: [
        { text: "Student", value: "Student" },
        { text: "Instructor", value: "Instructor" },
        { text: "Admin", value: "Admin" },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "default"
        if (status === "Active") color = "success"
        else if (status === "Inactive") color = "warning"
        else if (status === "Blocked") color = "error"
        else if (status === "Pending") color = "processing"

        return <Tag color={color}>{status}</Tag>
      },
      filters: [
        { text: "Active", value: "Active" },
        { text: "Inactive", value: "Inactive" },
        { text: "Blocked", value: "Blocked" },
        { text: "Pending", value: "Pending" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Join Date",
      dataIndex: "joinDate",
      key: "joinDate",
      sorter: (a, b) => new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime(),
      responsive: ["lg"],
    },
    {
      title: "Last Active",
      dataIndex: "lastActive",
      key: "lastActive",
      sorter: (a, b) => new Date(a.lastActive).getTime() - new Date(b.lastActive).getTime(),
      responsive: ["lg"],
    },
    {
      title: "Courses",
      dataIndex: "courses",
      key: "courses",
      sorter: (a, b) => a.courses - b.courses,
      responsive: ["md"],
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              { key: "1", label: "View Profile" },
              { key: "2", label: "Edit User" },
              { key: "3", label: "Reset Password" },
              { type: "divider" },
              {
                key: "4",
                label: record.status === "Active" ? "Deactivate User" : "Activate User",
                danger: record.status === "Active",
              },
              { key: "5", label: "Delete User", danger: true },
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
        console.log("New user:", values)
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
            User Management
          </Title>
          <Text type="secondary">Manage all users, students, instructors, and admins</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <Row gutter={[24, 24]} className="mb-6">
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-sm text-center">
            <Statistic title="Total Users" value={users.length} prefix={<TeamOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-sm text-center">
            <Statistic
              title="Students"
              value={users.filter((u) => u.role === "Student").length}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-sm text-center">
            <Statistic
              title="Instructors"
              value={users.filter((u) => u.role === "Instructor").length}
              prefix={<UserSwitchOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-sm text-center">
            <Statistic
              title="Admins"
              value={users.filter((u) => u.role === "Admin").length}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card bordered={false} className="shadow-sm">
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane
            tab={
              <Badge count={users.length}>
                <span className="pr-4">All Users</span>
              </Badge>
            }
            key="all"
          />
          <TabPane
            tab={
              <Badge count={users.filter((u) => u.role === "Student").length}>
                <span className="pr-4">Students</span>
              </Badge>
            }
            key="students"
          />
          <TabPane
            tab={
              <Badge count={users.filter((u) => u.role === "Instructor").length}>
                <span className="pr-4">Instructors</span>
              </Badge>
            }
            key="instructors"
          />
          <TabPane
            tab={
              <Badge count={users.filter((u) => u.role === "Admin").length}>
                <span className="pr-4">Admins</span>
              </Badge>
            }
            key="admins"
          />
          <TabPane
            tab={
              <Badge count={users.filter((u) => u.status === "Active").length}>
                <span className="pr-4">Active</span>
              </Badge>
            }
            key="active"
          />
          <TabPane
            tab={
              <Badge count={users.filter((u) => u.status !== "Active").length}>
                <span className="pr-4">Inactive</span>
              </Badge>
            }
            key="inactive"
          />
        </Tabs>

        <Divider className="my-4" />

        <div className="flex justify-between mb-4 flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search users by name, email or ID"
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
            <Tooltip title="Import">
              <Button icon={<ImportOutlined />}>Import</Button>
            </Tooltip>
          </Space>
        </div>

        <div className="mb-4">
          {hasSelected && (
            <div className="bg-blue-50 p-2 rounded flex justify-between items-center">
              <Text>{`Selected ${selectedRowKeys.length} users`}</Text>
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
          dataSource={filteredUsers}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`,
          }}
          scroll={{ x: "max-content" }}
        />
      </Card>

      <Modal title="Add New User" open={isModalVisible} onCancel={handleCancel} onOk={handleCreate} width={600}>
        <Form form={form} layout="vertical" initialValues={{ role: "Student", status: "Active" }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: "Please enter user's name" }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Enter full name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter user's email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Enter email address" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="phone" label="Phone Number">
                <Input prefix={<PhoneOutlined />} placeholder="Enter phone number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: "Please enter password" }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Enter password" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="role" label="Role" rules={[{ required: true, message: "Please select a role" }]}>
                <Select placeholder="Select a role">
                  <Option value="Student">Student</Option>
                  <Option value="Instructor">Instructor</Option>
                  <Option value="Admin">Admin</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="status" label="Status" rules={[{ required: true, message: "Please select a status" }]}>
                <Select placeholder="Select a status">
                  <Option value="Active">Active</Option>
                  <Option value="Inactive">Inactive</Option>
                  <Option value="Pending">Pending</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="notes" label="Notes">
            <Input.TextArea rows={4} placeholder="Additional notes about this user" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default UserManagement
