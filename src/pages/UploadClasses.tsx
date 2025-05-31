import React, { useState } from "react"
import {
  Card,
  Typography,
  Button,
  Form,
  Input,
  Select,
  Upload,
  Row,
  Col,
  Modal,
  message,
} from "antd"
import {
  PlusOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  BookOutlined,
  UserOutlined,
} from "@ant-design/icons"
import SectionHeader from "../components/SectionHeader"
import GridStatsCard from "../components/GridStatsCard"

const { Title, Text } = Typography
const { Option } = Select

const UploadClasses: React.FC = () => {
  const [form] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [uploading, setUploading] = useState(false)

  // Example stats for the top
  const stats = [
    {
      title: "Total Classes",
      value: 128,
      prefix: <BookOutlined />,
      valueStyle: { color: "#1890ff" },
    },
    {
      title: "Total Instructors",
      value: 12,
      prefix: <UserOutlined />,
      valueStyle: { color: "#52c41a" },
    },
    {
      title: "Total Videos",
      value: 542,
      prefix: <VideoCameraOutlined />,
      valueStyle: { color: "#722ed1" },
    },
    {
      title: "Pending Approvals",
      value: 4,
      prefix: <UploadOutlined />,
      valueStyle: { color: "#faad14" },
    },
  ]

  const showModal = () => setIsModalVisible(true)
  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }
  const handleUpload = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values)
        setUploading(true)
        setTimeout(() => {
          setUploading(false)
          setIsModalVisible(false)
          message.success("Class uploaded successfully!")
          form.resetFields()
        }, 1200)
      })
      .catch(() => {})
  }

  return (
    <div>
      <SectionHeader
        title="Upload Classes"
        subtitle="Add new classes and manage your course content"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
            Upload New Class
          </Button>
        }
      />

      <GridStatsCard stats={stats} />

      <Card bordered={false} className="shadow-sm">
        <Row gutter={[24, 24]}>
          <Col xs={24} md={16}>
            <Title level={4}>How to Upload a Class</Title>
            <Text type="secondary">
              Click the <b>Upload New Class</b> button to add a new class. Fill in all required fields, upload your video and materials, and submit for approval.
            </Text>
            <div className="mt-6">
              <ul style={{ paddingLeft: 20 }}>
                <li>Fill in class title, description, and select the course.</li>
                <li>Upload a video file and any supporting materials (PDF, DOC, etc.).</li>
                <li>Assign an instructor and set the class status.</li>
                <li>Submit for review and approval.</li>
              </ul>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <Card bordered className="mb-0">
              <Title level={5}>Quick Tips</Title>
              <ul style={{ paddingLeft: 20 }}>
                <li>Use clear, descriptive titles.</li>
                <li>Keep video files under 1GB for faster uploads.</li>
                <li>Attach supporting documents for better learning.</li>
                <li>Check your upload status in the dashboard.</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </Card>

      <Modal
        title="Upload New Class"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleUpload}
        confirmLoading={uploading}
        okText="Upload"
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Class Title"
            rules={[{ required: true, message: "Please enter the class title" }]}
          >
            <Input placeholder="Enter class title" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea rows={3} placeholder="Enter class description" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="course"
                label="Course"
                rules={[{ required: true, message: "Please select a course" }]}
              >
                <Select placeholder="Select course">
                  <Option value="react">React Development</Option>
                  <Option value="python">Python for Beginners</Option>
                  <Option value="uiux">UI/UX Design</Option>
                  <Option value="datasci">Data Science</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="instructor"
                label="Instructor"
                rules={[{ required: true, message: "Please select an instructor" }]}
              >
                <Select placeholder="Select instructor">
                  <Option value="john">John Smith</Option>
                  <Option value="emily">Emily Johnson</Option>
                  <Option value="michael">Michael Brown</Option>
                  <Option value="sarah">Sarah Wilson</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="video"
            label="Class Video"
            valuePropName="fileList"
            getValueFromEvent={e => (Array.isArray(e) ? e : e && e.fileList)}
            rules={[{ required: true, message: "Please upload a video file" }]}
          >
            <Upload
              beforeUpload={() => false}
              accept="video/*"
              maxCount={1}
              listType="text"
            >
              <Button icon={<UploadOutlined />}>Select Video</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="materials"
            label="Supporting Materials"
            valuePropName="fileList"
            getValueFromEvent={e => (Array.isArray(e) ? e : e && e.fileList)}
          >
            <Upload
              beforeUpload={() => false}
              accept=".pdf,.doc,.docx"
              multiple
              listType="text"
            >
              <Button icon={<UploadOutlined />}>Upload Materials</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select status" }]}
            initialValue="Pending"
          >
            <Select>
              <Option value="Pending">Pending</Option>
              <Option value="Published">Published</Option>
              <Option value="Draft">Draft</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default UploadClasses    