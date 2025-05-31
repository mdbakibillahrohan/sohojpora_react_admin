"use client"

import type React from "react"
import { useState } from "react"
import {
  Card,
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
  Row,
  Col,
  Divider,
} from "antd"
import {
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
import SectionHeader from '../components/SectionHeader';
import GridStatsCard from '../components/GridStatsCard';
import TabsWithBadge from '../components/TabsWithBadge';
import TableWithAction from '../components/TableWithAction';

const { Option } = Select

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

  const showModal = () => setIsModalVisible(true)
  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }
  const handleCreate = () => {
    form
      .validateFields()
      .then((values) => {
        // Add user logic here
        console.log(values)
        setIsModalVisible(false)
        form.resetFields()
      })
      .catch((info) => {
        console.log(info)
      })
  }
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => setSelectedRowKeys(newSelectedRowKeys)
  const rowSelection = { selectedRowKeys, onChange: onSelectChange }

  const stats = [
    { title: "Total Users", value: users.length, prefix: <TeamOutlined /> },
    { title: "Students", value: users.filter(u => u.role === "Student").length, prefix: <UserOutlined /> },
    { title: "Instructors", value: users.filter(u => u.role === "Instructor").length, prefix: <UserSwitchOutlined /> },
    { title: "Admins", value: users.filter(u => u.role === "Admin").length, prefix: <UserOutlined /> },
  ]

  const tabs = [
    { key: "all", label: "All Users", count: users.length },
    { key: "students", label: "Students", count: users.filter(u => u.role === "Student").length },
    { key: "instructors", label: "Instructors", count: users.filter(u => u.role === "Instructor").length },
    { key: "admins", label: "Admins", count: users.filter(u => u.role === "Admin").length },
    { key: "active", label: "Active", count: users.filter(u => u.status === "Active").length },
    { key: "inactive", label: "Inactive", count: users.filter(u => u.status !== "Active").length },
  ]

  return (
    <div>
      <SectionHeader
        title="User Management"
        subtitle="Manage users, roles, and permissions"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
            Add User
          </Button>
        }
      />

      {/* Stats Cards */}
      <GridStatsCard stats={stats} />

      <Card bordered={false} className="shadow-sm">
        <TabsWithBadge
          activeKey={activeTab}
          onChange={setActiveTab}
          tabs={tabs}
        />

        <Divider className="my-4" />

        <TableWithAction
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredUsers}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total: number, range: [number, number]) => `${range[0]}-${range[1]} of ${total} users`,
          }}
          scroll={{ x: "max-content" }}
          searchText={searchText}
          setSearchText={setSearchText}
          extraActions={
            <Space>
              <Tooltip title="Filter">
                <Button icon={<FilterOutlined />} onClick={() => console.log("Filter clicked")}></Button>
              </Tooltip>
              <Tooltip title="Export">
                <Button icon={<ExportOutlined />} onClick={() => console.log("Export clicked")}></Button>
              </Tooltip>
              <Tooltip title="Import">
                <Button icon={<ImportOutlined />} onClick={() => console.log("Import clicked")}></Button>
              </Tooltip>
            </Space>
          }
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