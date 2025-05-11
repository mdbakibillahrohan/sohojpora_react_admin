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
  Upload,
  Tooltip,
  Badge,
  Tabs,
  Statistic,
  Row,
  Col,
  Divider,
  Image,
} from "antd"
import {
  SearchOutlined,
  PlusOutlined,
  MoreOutlined,
  FilterOutlined,
  ExportOutlined,
  FileTextOutlined,
  FileImageOutlined,
  VideoCameraOutlined,
  FileOutlined,
  DeleteOutlined,
  EyeOutlined,
  DownloadOutlined,
  EditOutlined,
  InboxOutlined,
} from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import type { UploadProps } from "antd"

const { Title, Text } = Typography
const { Option } = Select
const { TabPane } = Tabs
const { Dragger } = Upload

interface ContentData {
  key: string
  id: string
  title: string
  type: string
  format: string
  size: number
  uploadDate: string
  lastUsed: string
  status: string
  usedIn: string[]
  thumbnail?: string
}

const ContentLibrary: React.FC = () => {
  const [searchText, setSearchText] = useState("")
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isPreviewVisible, setIsPreviewVisible] = useState(false)
  const [previewItem, setPreviewItem] = useState<ContentData | null>(null)
  const [form] = Form.useForm()
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [activeTab, setActiveTab] = useState("all")

  // Sample data
  const contents: ContentData[] = [
    {
      key: "1",
      id: "CNT001",
      title: "Introduction to React",
      type: "Video",
      format: "MP4",
      size: 45.8,
      uploadDate: "2023-04-15",
      lastUsed: "2023-05-07",
      status: "Active",
      usedIn: ["Advanced React Development", "Web Development Bootcamp"],
      thumbnail: "/placeholder.svg?height=80&width=120",
    },
    {
      key: "2",
      id: "CNT002",
      title: "Data Science Fundamentals Slides",
      type: "Document",
      format: "PDF",
      size: 2.4,
      uploadDate: "2023-03-20",
      lastUsed: "2023-05-05",
      status: "Active",
      usedIn: ["Data Science Fundamentals"],
    },
    {
      key: "3",
      id: "CNT003",
      title: "UI Design Principles",
      type: "Image",
      format: "PNG",
      size: 1.2,
      uploadDate: "2023-02-10",
      lastUsed: "2023-04-28",
      status: "Active",
      usedIn: ["UI/UX Design Masterclass"],
      thumbnail: "/placeholder.svg?height=80&width=120",
    },
    {
      key: "4",
      id: "CNT004",
      title: "Python Programming Quiz",
      type: "Quiz",
      format: "JSON",
      size: 0.3,
      uploadDate: "2023-05-01",
      lastUsed: "2023-05-06",
      status: "Active",
      usedIn: ["Python for Machine Learning", "Introduction to Python"],
    },
    {
      key: "5",
      id: "CNT005",
      title: "Full Stack Development Guide",
      type: "Document",
      format: "DOCX",
      size: 3.7,
      uploadDate: "2023-01-15",
      lastUsed: "2023-04-20",
      status: "Active",
      usedIn: ["Full Stack Web Development"],
    },
    {
      key: "6",
      id: "CNT006",
      title: "JavaScript Basics",
      type: "Video",
      format: "MP4",
      size: 38.2,
      uploadDate: "2023-04-25",
      lastUsed: "2023-05-02",
      status: "Processing",
      usedIn: ["JavaScript Fundamentals"],
      thumbnail: "/placeholder.svg?height=80&width=120",
    },
    {
      key: "7",
      id: "CNT007",
      title: "React Native Components",
      type: "Code",
      format: "ZIP",
      size: 5.6,
      uploadDate: "2023-03-10",
      lastUsed: "2023-04-28",
      status: "Active",
      usedIn: ["Mobile App Development with React Native"],
    },
    {
      key: "8",
      id: "CNT008",
      title: "SQL Database Schema",
      type: "Document",
      format: "PDF",
      size: 1.8,
      uploadDate: "2023-02-20",
      lastUsed: "2023-05-03",
      status: "Active",
      usedIn: ["Advanced SQL for Data Analysis"],
    },
    {
      key: "9",
      id: "CNT009",
      title: "Digital Marketing Strategy",
      type: "Presentation",
      format: "PPTX",
      size: 4.2,
      uploadDate: "2023-01-05",
      lastUsed: "2023-04-15",
      status: "Inactive",
      usedIn: ["Digital Marketing Essentials"],
    },
    {
      key: "10",
      id: "CNT010",
      title: "Graphic Design Elements",
      type: "Image",
      format: "AI",
      size: 8.5,
      uploadDate: "2023-05-05",
      lastUsed: "2023-05-05",
      status: "Active",
      usedIn: ["Graphic Design Principles"],
      thumbnail: "/placeholder.svg?height=80&width=120",
    },
  ]

  const filteredContents = contents.filter((content) => {
    if (activeTab === "all") return true
    if (activeTab === "videos") return content.type === "Video"
    if (activeTab === "documents") return content.type === "Document" || content.type === "Presentation"
    if (activeTab === "images") return content.type === "Image"
    if (activeTab === "other") return !["Video", "Document", "Presentation", "Image"].includes(content.type)
    return true
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Video":
        return <VideoCameraOutlined style={{ color: "#1890ff" }} />
      case "Document":
        return <FileTextOutlined style={{ color: "#52c41a" }} />
      case "Image":
        return <FileImageOutlined style={{ color: "#722ed1" }} />
      case "Presentation":
        return <FileTextOutlined style={{ color: "#fa8c16" }} />
      case "Quiz":
        return <FileOutlined style={{ color: "#eb2f96" }} />
      case "Code":
        return <FileOutlined style={{ color: "#faad14" }} />
      default:
        return <FileOutlined />
    }
  }

  const columns: ColumnsType<ContentData> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: "Content",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div className="flex items-center">
          {record.thumbnail ? (
            <Image
              src={record.thumbnail || "/placeholder.svg"}
              alt={text}
              width={60}
              height={40}
              className="mr-3 object-cover rounded"
              preview={false}
            />
          ) : (
            <div className="w-[60px] h-[40px] bg-gray-200 rounded flex items-center justify-center mr-3">
              {getTypeIcon(record.type)}
            </div>
          )}
          <div>
            <div className="font-medium">{text}</div>
            <div className="text-xs text-gray-500">
              {record.format} • {record.size} MB
            </div>
          </div>
        </div>
      ),
      sorter: (a, b) => a.title.localeCompare(b.title),
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) => {
        return (
          record.title.toLowerCase().includes(value.toString().toLowerCase()) ||
          record.id.toLowerCase().includes(value.toString().toLowerCase()) ||
          record.type.toLowerCase().includes(value.toString().toLowerCase()) ||
          record.format.toLowerCase().includes(value.toString().toLowerCase())
        )
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => <Tag icon={getTypeIcon(type)}>{type}</Tag>,
      filters: [
        { text: "Video", value: "Video" },
        { text: "Document", value: "Document" },
        { text: "Image", value: "Image" },
        { text: "Presentation", value: "Presentation" },
        { text: "Quiz", value: "Quiz" },
        { text: "Code", value: "Code" },
      ],
      onFilter: (value, record) => record.type === value,
      responsive: ["md"],
    },
    {
      title: "Upload Date",
      dataIndex: "uploadDate",
      key: "uploadDate",
      sorter: (a, b) => new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime(),
      responsive: ["lg"],
    },
    {
      title: "Last Used",
      dataIndex: "lastUsed",
      key: "lastUsed",
      sorter: (a, b) => new Date(a.lastUsed).getTime() - new Date(b.lastUsed).getTime(),
      responsive: ["xl"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "default"

        if (status === "Active") {
          color = "success"
        } else if (status === "Processing") {
          color = "processing"
        } else if (status === "Inactive") {
          color = "warning"
        }

        return <Tag color={color}>{status}</Tag>
      },
      filters: [
        { text: "Active", value: "Active" },
        { text: "Processing", value: "Processing" },
        { text: "Inactive", value: "Inactive" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Used In",
      dataIndex: "usedIn",
      key: "usedIn",
      render: (usedIn) => (
        <>
          {usedIn.length > 0 ? (
            <Tooltip title={usedIn.join(", ")}>
              <Tag color="blue">
                {usedIn.length} course{usedIn.length > 1 ? "s" : ""}
              </Tag>
            </Tooltip>
          ) : (
            <Tag color="default">Not used</Tag>
          )}
        </>
      ),
      responsive: ["lg"],
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Tooltip title="Preview">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => {
                setPreviewItem(record)
                setIsPreviewVisible(true)
              }}
            />
          </Tooltip>
          <Tooltip title="Download">
            <Button type="text" icon={<DownloadOutlined />} />
          </Tooltip>
          <Dropdown
            menu={{
              items: [
                { key: "1", label: "Preview", icon: <EyeOutlined /> },
                { key: "2", label: "Download", icon: <DownloadOutlined /> },
                { key: "3", label: "Edit Details", icon: <EditOutlined /> },
                { type: "divider" },
                { key: "4", label: record.status === "Active" ? "Deactivate" : "Activate" },
                { key: "5", label: "Delete", icon: <DeleteOutlined />, danger: true },
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
        console.log("New content:", values)
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
    multiple: true,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(info) {
      const { status } = info.file
      if (status !== "uploading") {
        console.log(info.file, info.fileList)
      }
      if (status === "done") {
        console.log(`${info.file.name} file uploaded successfully.`)
      } else if (status === "error") {
        console.log(`${info.file.name} file upload failed.`)
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files)
    },
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={2} className="mb-0">
            Content Library
          </Title>
          <Text type="secondary">Manage all your course content and media files</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Upload Content
        </Button>
      </div>

      {/* Stats Cards */}
      <Row gutter={[24, 24]} className="mb-6">
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-sm text-center">
            <Statistic title="Total Files" value={contents.length} prefix={<FileOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-sm text-center">
            <Statistic
              title="Videos"
              value={contents.filter((c) => c.type === "Video").length}
              prefix={<VideoCameraOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-sm text-center">
            <Statistic
              title="Documents"
              value={contents.filter((c) => c.type === "Document" || c.type === "Presentation").length}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-sm text-center">
            <Statistic
              title="Storage Used"
              value={contents.reduce((sum, content) => sum + content.size, 0).toFixed(1)}
              suffix="MB"
            />
          </Card>
        </Col>
      </Row>

      <Card bordered={false} className="shadow-sm">
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane
            tab={
              <Badge count={contents.length}>
                <span className="pr-4">All Files</span>
              </Badge>
            }
            key="all"
          />
          <TabPane
            tab={
              <Badge count={contents.filter((c) => c.type === "Video").length}>
                <span className="pr-4">Videos</span>
              </Badge>
            }
            key="videos"
          />
          <TabPane
            tab={
              <Badge count={contents.filter((c) => c.type === "Document" || c.type === "Presentation").length}>
                <span className="pr-4">Documents</span>
              </Badge>
            }
            key="documents"
          />
          <TabPane
            tab={
              <Badge count={contents.filter((c) => c.type === "Image").length}>
                <span className="pr-4">Images</span>
              </Badge>
            }
            key="images"
          />
          <TabPane
            tab={
              <Badge
                count={contents.filter((c) => !["Video", "Document", "Presentation", "Image"].includes(c.type)).length}
              >
                <span className="pr-4">Other</span>
              </Badge>
            }
            key="other"
          />
        </Tabs>

        <Divider className="my-4" />

        <div className="flex justify-between mb-4 flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search by title, type, or format"
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
              <Text>{`Selected ${selectedRowKeys.length} files`}</Text>
              <Space>
                <Button size="small">Download</Button>
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
          dataSource={filteredContents}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} files`,
          }}
          scroll={{ x: "max-content" }}
        />
      </Card>

      <Modal title="Upload Content" open={isModalVisible} onCancel={handleCancel} onOk={handleCreate} width={700}>
        <Form form={form} layout="vertical">
          <Dragger {...uploadProps} className="mb-6">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag files to this area to upload</p>
            <p className="ant-upload-hint">
              Support for single or bulk upload. Strictly prohibited from uploading company data or other banned files.
            </p>
          </Dragger>

          <Form.Item
            name="title"
            label="Content Title"
            rules={[{ required: true, message: "Please enter content title" }]}
          >
            <Input placeholder="Enter content title" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Content Type"
                rules={[{ required: true, message: "Please select content type" }]}
              >
                <Select placeholder="Select content type">
                  <Option value="Video">Video</Option>
                  <Option value="Document">Document</Option>
                  <Option value="Image">Image</Option>
                  <Option value="Presentation">Presentation</Option>
                  <Option value="Quiz">Quiz</Option>
                  <Option value="Code">Code</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="courses" label="Assign to Courses">
                <Select mode="multiple" placeholder="Select courses" optionLabelProp="label">
                  <Option value="advanced-react" label="Advanced React Development">
                    Advanced React Development
                  </Option>
                  <Option value="data-science" label="Data Science Fundamentals">
                    Data Science Fundamentals
                  </Option>
                  <Option value="ui-ux" label="UI/UX Design Masterclass">
                    UI/UX Design Masterclass
                  </Option>
                  <Option value="python-ml" label="Python for Machine Learning">
                    Python for Machine Learning
                  </Option>
                  <Option value="full-stack" label="Full Stack Web Development">
                    Full Stack Web Development
                  </Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} placeholder="Enter content description" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={previewItem?.title}
        open={isPreviewVisible}
        onCancel={() => setIsPreviewVisible(false)}
        footer={[
          <Button key="download" icon={<DownloadOutlined />}>
            Download
          </Button>,
          <Button key="close" onClick={() => setIsPreviewVisible(false)}>
            Close
          </Button>,
        ]}
        width={800}
      >
        {previewItem && (
          <div className="text-center">
            {previewItem.type === "Video" ? (
              <div className="bg-gray-100 p-8 rounded flex items-center justify-center">
                <div className="text-center">
                  <VideoCameraOutlined style={{ fontSize: 48, color: "#1890ff" }} />
                  <div className="mt-4">Video Preview Not Available</div>
                  <div className="text-gray-500 text-sm mt-2">
                    {previewItem.format} • {previewItem.size} MB
                  </div>
                </div>
              </div>
            ) : previewItem.type === "Image" ? (
              <Image
                src={previewItem.thumbnail || "/placeholder.svg?height=400&width=600"}
                alt={previewItem.title}
                style={{ maxWidth: "100%", maxHeight: "400px" }}
              />
            ) : (
              <div className="bg-gray-100 p-8 rounded flex items-center justify-center">
                <div className="text-center">
                  {getTypeIcon(previewItem.type)}
                  <div className="mt-4">Preview Not Available</div>
                  <div className="text-gray-500 text-sm mt-2">
                    {previewItem.format} • {previewItem.size} MB
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 text-left">
              <div className="mb-4">
                <Text strong>File Information:</Text>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <Text type="secondary">ID:</Text> {previewItem.id}
                  </div>
                  <div>
                    <Text type="secondary">Type:</Text> {previewItem.type}
                  </div>
                  <div>
                    <Text type="secondary">Format:</Text> {previewItem.format}
                  </div>
                  <div>
                    <Text type="secondary">Size:</Text> {previewItem.size} MB
                  </div>
                  <div>
                    <Text type="secondary">Upload Date:</Text> {previewItem.uploadDate}
                  </div>
                  <div>
                    <Text type="secondary">Last Used:</Text> {previewItem.lastUsed}
                  </div>
                </div>
              </div>

              <div>
                <Text strong>Used In:</Text>
                <div className="mt-2">
                  {previewItem.usedIn.length > 0 ? (
                    previewItem.usedIn.map((course, index) => (
                      <Tag key={index} color="blue" className="mb-1 mr-1">
                        {course}
                      </Tag>
                    ))
                  ) : (
                    <Text type="secondary">Not used in any courses</Text>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default ContentLibrary
