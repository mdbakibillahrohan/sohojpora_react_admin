import type React from "react"
import { Card, Typography, Form, Switch, Divider, Select, Button, List, Avatar, Popconfirm, message } from "antd"
import {
  BellOutlined,
  GlobalOutlined,
  LockOutlined,
  DeleteOutlined,
  ApiOutlined,
  AppstoreOutlined,
} from "@ant-design/icons"

const { Title, Text, Paragraph } = Typography
const { Option } = Select

const Settings: React.FC = () => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log("Settings updated:", values)
    message.success("Settings updated successfully")
  }

  const handleDeleteAccount = () => {
    message.warning("Account deletion would be processed here")
  }

  const connectedApps = [
    { id: 1, name: "Google Calendar", icon: <AppstoreOutlined />, connected: true },
    { id: 2, name: "Slack", icon: <AppstoreOutlined />, connected: true },
    { id: 3, name: "GitHub", icon: <AppstoreOutlined />, connected: false },
  ]

  return (
    <div>
      <Title level={2}>Settings</Title>
      <Text type="secondary" className="block mb-6">
        Manage your account settings and preferences
      </Text>

      <Card className="mb-6">
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            emailNotifications: true,
            courseUpdates: true,
            newMessages: true,
            assignmentReminders: true,
            marketingEmails: false,
            language: "english",
            timezone: "UTC-5",
            theme: "light",
          }}
          onFinish={onFinish}
        >
          <Title level={4}>
            <BellOutlined className="mr-2" /> Notification Settings
          </Title>
          <Paragraph type="secondary" className="mb-4">
            Control which notifications you receive
          </Paragraph>

          <Form.Item name="emailNotifications" label="Email Notifications" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item name="courseUpdates" label="Course Updates" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item name="newMessages" label="New Messages" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item name="assignmentReminders" label="Assignment Reminders" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item name="marketingEmails" label="Marketing Emails" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Divider />

          <Title level={4}>
            <GlobalOutlined className="mr-2" /> Regional Settings
          </Title>
          <Paragraph type="secondary" className="mb-4">
            Customize your language and timezone preferences
          </Paragraph>

          <Form.Item name="language" label="Language">
            <Select>
              <Option value="english">English</Option>
              <Option value="spanish">Spanish</Option>
              <Option value="french">French</Option>
              <Option value="german">German</Option>
              <Option value="chinese">Chinese</Option>
            </Select>
          </Form.Item>

          <Form.Item name="timezone" label="Timezone">
            <Select>
              <Option value="UTC-12">UTC-12:00</Option>
              <Option value="UTC-11">UTC-11:00</Option>
              <Option value="UTC-10">UTC-10:00</Option>
              <Option value="UTC-9">UTC-09:00</Option>
              <Option value="UTC-8">UTC-08:00</Option>
              <Option value="UTC-7">UTC-07:00</Option>
              <Option value="UTC-6">UTC-06:00</Option>
              <Option value="UTC-5">UTC-05:00</Option>
              <Option value="UTC-4">UTC-04:00</Option>
              <Option value="UTC-3">UTC-03:00</Option>
              <Option value="UTC-2">UTC-02:00</Option>
              <Option value="UTC-1">UTC-01:00</Option>
              <Option value="UTC">UTC+00:00</Option>
              <Option value="UTC+1">UTC+01:00</Option>
              <Option value="UTC+2">UTC+02:00</Option>
              <Option value="UTC+3">UTC+03:00</Option>
              <Option value="UTC+4">UTC+04:00</Option>
              <Option value="UTC+5">UTC+05:00</Option>
              <Option value="UTC+6">UTC+06:00</Option>
              <Option value="UTC+7">UTC+07:00</Option>
              <Option value="UTC+8">UTC+08:00</Option>
              <Option value="UTC+9">UTC+09:00</Option>
              <Option value="UTC+10">UTC+10:00</Option>
              <Option value="UTC+11">UTC+11:00</Option>
              <Option value="UTC+12">UTC+12:00</Option>
            </Select>
          </Form.Item>

          <Form.Item name="theme" label="Theme">
            <Select>
              <Option value="light">Light</Option>
              <Option value="dark">Dark</Option>
              <Option value="system">System Default</Option>
            </Select>
          </Form.Item>

          <Divider />

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Settings
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card className="mb-6">
        <Title level={4}>
          <ApiOutlined className="mr-2" /> Connected Applications
        </Title>
        <Paragraph type="secondary" className="mb-4">
          Manage applications connected to your account
        </Paragraph>

        <List
          itemLayout="horizontal"
          dataSource={connectedApps}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[item.connected ? <Button danger>Disconnect</Button> : <Button type="primary">Connect</Button>]}
            >
              <List.Item.Meta
                avatar={<Avatar icon={item.icon} />}
                title={item.name}
                description={item.connected ? "Connected" : "Not connected"}
              />
            </List.Item>
          )}
        />
      </Card>

      <Card>
        <Title level={4} type="danger">
          <LockOutlined className="mr-2" /> Danger Zone
        </Title>
        <Paragraph type="secondary" className="mb-4">
          Permanent actions that cannot be undone
        </Paragraph>

        <List.Item
          actions={[
            <Popconfirm
              title="Are you sure you want to delete your account?"
              description="This action cannot be undone. All your data will be permanently deleted."
              onConfirm={handleDeleteAccount}
              okText="Yes, delete my account"
              cancelText="Cancel"
              okButtonProps={{ danger: true }}
            >
              <Button danger icon={<DeleteOutlined />}>
                Delete Account
              </Button>
            </Popconfirm>,
          ]}
        >
          <List.Item.Meta
            title="Delete Account"
            description="Permanently delete your account and all associated data"
          />
        </List.Item>
      </Card>
    </div>
  )
}

export default Settings
