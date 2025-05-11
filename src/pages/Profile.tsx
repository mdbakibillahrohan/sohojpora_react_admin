import type React from "react"
import {
  Row,
  Col,
  Card,
  Typography,
  Avatar,
  Tabs,
  Form,
  Input,
  Button,
  Divider,
  Upload,
  message,
  List,
  Progress,
} from "antd"
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  UploadOutlined,
  TrophyOutlined,
  BookOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons"
import type { UploadProps } from "antd"

const { Title, Text, Paragraph } = Typography
const { TabPane } = Tabs

const Profile: React.FC = () => {
  const [form] = Form.useForm()
  const [passwordForm] = Form.useForm()

  // Sample user data
  const user = {
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Frontend developer passionate about creating intuitive user experiences. Currently focusing on React and TypeScript.",
    joinDate: "2022-09-15",
    avatar: null,
    completedCourses: 5,
    enrolledCourses: 8,
    totalHours: 42,
    certificates: [
      { id: 1, title: "HTML & CSS Basics", issueDate: "2022-10-20", course: "HTML & CSS Basics" },
      { id: 2, title: "Introduction to Python", issueDate: "2023-01-15", course: "Introduction to Python" },
    ],
    achievements: [
      { id: 1, title: "Fast Learner", description: "Completed 5 courses", icon: <BookOutlined /> },
      { id: 2, title: "Dedicated Student", description: "Spent over 40 hours learning", icon: <ClockCircleOutlined /> },
    ],
  }

  const onFinish = (values: any) => {
    console.log("Updated profile:", values)
    message.success("Profile updated successfully")
  }

  const onPasswordFinish = (values: any) => {
    console.log("Password change:", values)
    message.success("Password changed successfully")
    passwordForm.resetFields()
  }

  const uploadProps: UploadProps = {
    name: "avatar",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  return (
    <div>
      <Title level={2}>My Profile</Title>
      <Text type="secondary" className="block mb-6">
        Manage your personal information and account settings
      </Text>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <Card className="text-center">
            <Avatar size={100} icon={<UserOutlined />} src={user.avatar} className="mb-4" />
            <Title level={3}>{user.name}</Title>
            <div className="flex justify-center items-center gap-2 mb-4">
              <MailOutlined />
              <Text>{user.email}</Text>
            </div>
            <div className="flex justify-center items-center gap-2 mb-4">
              <PhoneOutlined />
              <Text>{user.phone}</Text>
            </div>
            <Paragraph className="text-left mt-4">{user.bio}</Paragraph>
            <Divider />
            <div className="flex justify-between mb-4">
              <div className="text-center">
                <Title level={4}>{user.completedCourses}</Title>
                <Text type="secondary">Completed</Text>
              </div>
              <div className="text-center">
                <Title level={4}>{user.enrolledCourses}</Title>
                <Text type="secondary">Enrolled</Text>
              </div>
              <div className="text-center">
                <Title level={4}>{user.totalHours}</Title>
                <Text type="secondary">Hours</Text>
              </div>
            </div>
            <Text type="secondary">Member since {new Date(user.joinDate).toLocaleDateString()}</Text>
          </Card>

          <Card title="Achievements" className="mt-4">
            <List
              itemLayout="horizontal"
              dataSource={user.achievements}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={item.icon} style={{ backgroundColor: "#1890ff" }} />}
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          <Card>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Edit Profile" key="1">
                <Form
                  form={form}
                  layout="vertical"
                  initialValues={{
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    bio: user.bio,
                  }}
                  onFinish={onFinish}
                >
                  <Form.Item label="Profile Picture" name="avatar">
                    <Upload {...uploadProps}>
                      <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                    </Upload>
                  </Form.Item>

                  <Form.Item
                    label="Full Name"
                    name="name"
                    rules={[{ required: true, message: "Please input your name!" }]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="Full Name" />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                      { type: "email", message: "Please enter a valid email!" },
                    ]}
                  >
                    <Input prefix={<MailOutlined />} placeholder="Email" />
                  </Form.Item>

                  <Form.Item label="Phone Number" name="phone">
                    <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
                  </Form.Item>

                  <Form.Item label="Bio" name="bio">
                    <Input.TextArea rows={4} placeholder="Tell us about yourself" />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Save Changes
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>

              <TabPane tab="Change Password" key="2">
                <Form form={passwordForm} layout="vertical" onFinish={onPasswordFinish}>
                  <Form.Item
                    label="Current Password"
                    name="currentPassword"
                    rules={[{ required: true, message: "Please input your current password!" }]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="Current Password" />
                  </Form.Item>

                  <Form.Item
                    label="New Password"
                    name="newPassword"
                    rules={[
                      { required: true, message: "Please input your new password!" },
                      { min: 8, message: "Password must be at least 8 characters!" },
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="New Password" />
                  </Form.Item>

                  <Form.Item
                    label="Confirm New Password"
                    name="confirmPassword"
                    dependencies={["newPassword"]}
                    rules={[
                      { required: true, message: "Please confirm your new password!" },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("newPassword") === value) {
                            return Promise.resolve()
                          }
                          return Promise.reject(new Error("The two passwords do not match!"))
                        },
                      }),
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="Confirm New Password" />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Change Password
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>

              <TabPane tab="Certificates" key="3">
                {user.certificates.length > 0 ? (
                  <List
                    itemLayout="horizontal"
                    dataSource={user.certificates}
                    renderItem={(item) => (
                      <List.Item
                        key={item.id}
                        actions={[<Button type="link">Download</Button>, <Button type="link">Share</Button>]}
                      >
                        <List.Item.Meta
                          avatar={<Avatar icon={<TrophyOutlined />} style={{ backgroundColor: "#52c41a" }} />}
                          title={item.title}
                          description={
                            <>
                              <div>Course: {item.course}</div>
                              <div>Issued: {new Date(item.issueDate).toLocaleDateString()}</div>
                            </>
                          }
                        />
                      </List.Item>
                    )}
                  />
                ) : (
                  <div className="text-center py-8">
                    <TrophyOutlined style={{ fontSize: "48px", color: "#d9d9d9" }} />
                    <Title level={4} className="mt-4">
                      No Certificates Yet
                    </Title>
                    <Text type="secondary">Complete courses to earn certificates</Text>
                  </div>
                )}
              </TabPane>

              <TabPane tab="Learning Progress" key="4">
                <div className="mb-6">
                  <Title level={4}>Overall Progress</Title>
                  <Progress
                    percent={Math.round((user.completedCourses / user.enrolledCourses) * 100)}
                    status="active"
                  />
                </div>

                <div>
                  <Title level={4}>Learning Stats</Title>
                  <Row gutter={[16, 16]}>
                    <Col span={8}>
                      <Card>
                        <Statistic
                          title="Courses Completed"
                          value={user.completedCourses}
                          suffix={`/ ${user.enrolledCourses}`}
                        />
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card>
                        <Statistic title="Hours Spent" value={user.totalHours} />
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card>
                        <Statistic title="Certificates" value={user.certificates.length} />
                      </Card>
                    </Col>
                  </Row>
                </div>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

// Add this component to avoid errors since it's used in the Profile component
const Statistic = ({ title, value, suffix }: { title: string; value: number; suffix?: string }) => {
  return (
    <div className="text-center">
      <Title level={2} className="m-0">
        {value}
        {suffix}
      </Title>
      <Text type="secondary">{title}</Text>
    </div>
  )
}

export default Profile
