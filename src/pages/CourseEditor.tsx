"use client"

import type React from "react"
import { useState } from "react"
import {
  Card,
  Typography,
  Tabs,
  Form,
  Input,
  Button,
  Select,
  Upload,
  Switch,
  InputNumber,
  Row,
  Col,
  Divider,
  Space,
  message,
  Steps,
  Collapse,
  Modal,
  List,
  Tag,
  Breadcrumb,
} from "antd"
import {
  SaveOutlined,
  PlusOutlined,
  DeleteOutlined,
  DragOutlined,
  PlayCircleOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  CheckCircleOutlined,
  ArrowLeftOutlined,
  EyeOutlined,
  DollarOutlined,
} from "@ant-design/icons"
import { useParams, useNavigate } from "react-router-dom"
import type { UploadProps } from "antd"

const { Title, Text, Paragraph } = Typography
const { Option } = Select
const { TabPane } = Tabs
const { TextArea } = Input
const { Step } = Steps
const { Panel } = Collapse

const CourseEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [activeTab, setActiveTab] = useState("1")
  const [isAddModuleVisible, setIsAddModuleVisible] = useState(false)
  const [isAddLessonVisible, setIsAddLessonVisible] = useState(false)
  const [selectedModule, setSelectedModule] = useState<number | null>(null)
  const [isDirty, setIsDirty] = useState(false)

  // Sample course data
  const courseData = {
    id: id || "CRS001",
    title: "Advanced React Development",
    description:
      "Learn the advanced concepts of React including hooks, context API, Redux, and more. This course will take you from intermediate to advanced level in React development.",
    instructor: "John Doe",
    category: "Web Development",
    level: "Advanced",
    price: 79.99,
    status: "Published",
    thumbnail: null,
    featured: true,
    requirements: [
      "Basic knowledge of JavaScript",
      "Understanding of React fundamentals",
      "Familiarity with ES6 syntax",
    ],
    objectives: [
      "Master React hooks and functional components",
      "Implement state management with Redux",
      "Build performant React applications",
      "Deploy React applications to production",
    ],
    modules: [
      {
        id: 1,
        title: "Introduction to Advanced React",
        description: "Overview of advanced React concepts and course structure",
        lessons: [
          {
            id: 101,
            title: "Course Overview",
            type: "video",
            duration: "10:00",
            status: "published",
          },
          {
            id: 102,
            title: "Setting Up Development Environment",
            type: "video",
            duration: "15:00",
            status: "published",
          },
          {
            id: 103,
            title: "Module Quiz",
            type: "quiz",
            duration: "10:00",
            status: "published",
          },
        ],
      },
      {
        id: 2,
        title: "React Hooks Deep Dive",
        description: "Comprehensive exploration of React hooks",
        lessons: [
          {
            id: 201,
            title: "useState and useEffect",
            type: "video",
            duration: "20:00",
            status: "published",
          },
          {
            id: 202,
            title: "useContext and useReducer",
            type: "video",
            duration: "25:00",
            status: "published",
          },
          {
            id: 203,
            title: "Custom Hooks",
            type: "video",
            duration: "18:00",
            status: "published",
          },
          {
            id: 204,
            title: "Hooks Practice Assignment",
            type: "assignment",
            duration: "45:00",
            status: "published",
          },
        ],
      },
      {
        id: 3,
        title: "State Management with Redux",
        description: "Learn how to manage application state with Redux",
        lessons: [
          {
            id: 301,
            title: "Redux Fundamentals",
            type: "video",
            duration: "22:00",
            status: "draft",
          },
          {
            id: 302,
            title: "Actions, Reducers, and Store",
            type: "video",
            duration: "28:00",
            status: "draft",
          },
          {
            id: 303,
            title: "Redux Middleware",
            type: "video",
            duration: "20:00",
            status: "draft",
          },
        ],
      },
    ],
  }

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
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  const handleFormChange = () => {
    setIsDirty(true)
  }

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form values:", values)
        message.success("Course saved successfully")
        setIsDirty(false)
      })
      .catch((info) => {
        console.log("Validate Failed:", info)
        message.error("Please fix the errors in the form")
      })
  }

  const handlePublish = () => {
    Modal.confirm({
      title: "Publish Course",
      content: "Are you sure you want to publish this course? It will be visible to all students.",
      onOk() {
        message.success("Course published successfully")
      },
    })
  }

  const handleAddModule = () => {
    setIsAddModuleVisible(true)
  }

  const handleAddLesson = (moduleId: number) => {
    setSelectedModule(moduleId)
    setIsAddLessonVisible(true)
  }

  const handleModuleSubmit = (values: any) => {
    console.log("New module:", values)
    message.success("Module added successfully")
    setIsAddModuleVisible(false)
  }

  const handleLessonSubmit = (values: any) => {
    console.log("New lesson:", values)
    message.success("Lesson added successfully")
    setIsAddLessonVisible(false)
  }

  const getLessonTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <PlayCircleOutlined />
      case "quiz":
        return <QuestionCircleOutlined />
      case "assignment":
        return <FileTextOutlined />
      default:
        return <FileTextOutlined />
    }
  }

  const getLessonTypeTag = (type: string) => {
    let color = "default"

    switch (type) {
      case "video":
        color = "blue"
        break
      case "quiz":
        color = "purple"
        break
      case "assignment":
        color = "orange"
        break
      default:
        color = "default"
    }

    return <Tag color={color}>{type.charAt(0).toUpperCase() + type.slice(1)}</Tag>
  }

  const getStatusTag = (status: string) => {
    let color = "default"

    switch (status) {
      case "published":
        color = "success"
        break
      case "draft":
        color = "warning"
        break
      default:
        color = "default"
    }

    return <Tag color={color}>{status.charAt(0).toUpperCase() + status.slice(1)}</Tag>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <Breadcrumb
            items={[{ title: <a onClick={() => navigate("/courses")}>Courses</a> }, { title: courseData.title }]}
            className="mb-2"
          />
          <Title level={2} className="mb-0">
            Edit Course
          </Title>
          <Text type="secondary">ID: {courseData.id}</Text>
        </div>
        <Space>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate("/courses")}>
            Back to Courses
          </Button>
          <Button icon={<EyeOutlined />}>Preview</Button>
          <Button type="primary" icon={<SaveOutlined />} onClick={handleSave} disabled={!isDirty}>
            Save
          </Button>
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={handlePublish}
            className="bg-green-600 hover:bg-green-700"
          >
            Publish
          </Button>
        </Space>
      </div>

      <Card bordered={false} className="shadow-sm">
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="Basic Information" key="1">
            <Form form={form} layout="vertical" initialValues={courseData} onValuesChange={handleFormChange}>
              <Row gutter={24}>
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
                    <InputNumber min={0} precision={2} style={{ width: "100%" }} prefix={<DollarOutlined />} />
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

              <Row gutter={24}>
                <Col span={8}>
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
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="level" label="Level" rules={[{ required: true, message: "Please select a level" }]}>
                    <Select placeholder="Select a level">
                      <Option value="Beginner">Beginner</Option>
                      <Option value="Intermediate">Intermediate</Option>
                      <Option value="Advanced">Advanced</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
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
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="thumbnail" label="Course Thumbnail">
                <Upload {...uploadProps} listType="picture-card" maxCount={1}>
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>

              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item name="featured" label="Featured Course" valuePropName="checked">
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="status" label="Status">
                    <Select>
                      <Option value="Draft">Draft</Option>
                      <Option value="Review">Review</Option>
                      <Option value="Published">Published</Option>
                      <Option value="Archived">Archived</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Divider orientation="left">Course Requirements</Divider>
              <Form.List name="requirements">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Form.Item
                        key={key}
                        {...restField}
                        name={name}
                        rules={[{ required: true, message: "Please enter requirement or delete this field" }]}
                      >
                        <Input
                          placeholder="Enter a requirement"
                          addonAfter={<DeleteOutlined onClick={() => remove(name)} style={{ color: "red" }} />}
                        />
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add Requirement
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Divider orientation="left">Learning Objectives</Divider>
              <Form.List name="objectives">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Form.Item
                        key={key}
                        {...restField}
                        name={name}
                        rules={[{ required: true, message: "Please enter objective or delete this field" }]}
                      >
                        <Input
                          placeholder="Enter a learning objective"
                          addonAfter={<DeleteOutlined onClick={() => remove(name)} style={{ color: "red" }} />}
                        />
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add Learning Objective
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form>
          </TabPane>

          <TabPane tab="Curriculum" key="2">
            <div className="flex justify-between items-center mb-4">
              <Title level={4} className="mb-0">
                Course Curriculum
              </Title>
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAddModule}>
                Add Module
              </Button>
            </div>

            <Paragraph className="mb-6">
              Organize your course content into modules and lessons. Drag to reorder.
            </Paragraph>

            {courseData.modules.map((module, index) => (
              <Card
                key={module.id}
                className="mb-4 shadow-sm"
                title={
                  <div className="flex items-center">
                    <DragOutlined className="mr-2 text-gray-400 cursor-move" />
                    <span>
                      Module {index + 1}: {module.title}
                    </span>
                  </div>
                }
                extra={
                  <Space>
                    <Button
                      type="primary"
                      size="small"
                      icon={<PlusOutlined />}
                      onClick={() => handleAddLesson(module.id)}
                    >
                      Add Lesson
                    </Button>
                    <Button type="text" icon={<DeleteOutlined />} danger size="small" key="delete" />
                  </Space>
                }
              >
                <Paragraph type="secondary" className="mb-4">
                  {module.description}
                </Paragraph>

                <List
                  itemLayout="horizontal"
                  dataSource={module.lessons}
                  renderItem={(lesson, lessonIndex) => (
                    <List.Item
                      actions={[<Button type="text" icon={<DeleteOutlined />} danger size="small" key="delete" />]}
                    >
                      <List.Item.Meta
                        avatar={
                          <div className="flex items-center">
                            <DragOutlined className="mr-2 text-gray-400 cursor-move" />
                            {getLessonTypeIcon(lesson.type)}
                          </div>
                        }
                        title={
                          <div className="flex items-center">
                            <span>
                              {lessonIndex + 1}. {lesson.title}
                            </span>
                            <div className="ml-2">
                              {getLessonTypeTag(lesson.type)}
                              {getStatusTag(lesson.status)}
                            </div>
                          </div>
                        }
                        description={`Duration: ${lesson.duration}`}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            ))}
          </TabPane>

          <TabPane tab="Settings" key="3">
            <Form layout="vertical">
              <Card title="Course Settings" className="mb-4">
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      name="enrollmentLimit"
                      label="Enrollment Limit"
                      tooltip="Maximum number of students who can enroll (0 for unlimited)"
                    >
                      <InputNumber min={0} style={{ width: "100%" }} placeholder="0 (Unlimited)" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="duration" label="Course Duration (weeks)">
                      <InputNumber min={1} style={{ width: "100%" }} placeholder="4" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item name="certificate" label="Enable Certificate" valuePropName="checked">
                  <Switch />
                </Form.Item>

                <Form.Item name="discussionForum" label="Enable Discussion Forum" valuePropName="checked">
                  <Switch defaultChecked />
                </Form.Item>

                <Form.Item name="selfPaced" label="Self-Paced Learning" valuePropName="checked">
                  <Switch defaultChecked />
                </Form.Item>
              </Card>

              <Card title="Pricing & Access" className="mb-4">
                <Form.Item name="hasTrial" label="Enable Free Trial" valuePropName="checked">
                  <Switch />
                </Form.Item>

                <Form.Item name="trialLessons" label="Number of Free Trial Lessons" dependencies={["hasTrial"]}>
                  <InputNumber min={1} style={{ width: "100%" }} placeholder="2" />
                </Form.Item>

                <Form.Item name="hasDiscount" label="Enable Discount" valuePropName="checked">
                  <Switch />
                </Form.Item>

                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item name="discountPrice" label="Discounted Price ($)" dependencies={["hasDiscount"]}>
                      <InputNumber
                        min={0}
                        precision={2}
                        style={{ width: "100%" }}
                        prefix={<DollarOutlined />}
                        placeholder="39.99"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="discountExpiry" label="Discount Expiry Date" dependencies={["hasDiscount"]}>
                      <Input type="date" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              <Card title="SEO Settings">
                <Form.Item name="metaTitle" label="Meta Title">
                  <Input placeholder="Enter meta title for SEO" />
                </Form.Item>

                <Form.Item name="metaDescription" label="Meta Description">
                  <TextArea rows={3} placeholder="Enter meta description for SEO" />
                </Form.Item>

                <Form.Item name="metaKeywords" label="Meta Keywords">
                  <Input placeholder="Enter comma-separated keywords" />
                </Form.Item>
              </Card>
            </Form>
          </TabPane>
        </Tabs>
      </Card>

      {/* Add Module Modal */}
      <Modal
        title="Add New Module"
        open={isAddModuleVisible}
        onCancel={() => setIsAddModuleVisible(false)}
        onOk={() => {
          const moduleForm = document.getElementById("moduleForm") as HTMLFormElement
          if (moduleForm) moduleForm.submit()
        }}
      >
        <Form id="moduleForm" layout="vertical" onFinish={handleModuleSubmit}>
          <Form.Item
            name="title"
            label="Module Title"
            rules={[{ required: true, message: "Please enter module title" }]}
          >
            <Input placeholder="Enter module title" />
          </Form.Item>

          <Form.Item name="description" label="Module Description">
            <TextArea rows={3} placeholder="Enter module description" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Add Lesson Modal */}
      <Modal
        title="Add New Lesson"
        open={isAddLessonVisible}
        onCancel={() => setIsAddLessonVisible(false)}
        onOk={() => {
          const lessonForm = document.getElementById("lessonForm") as HTMLFormElement
          if (lessonForm) lessonForm.submit()
        }}
      >
        <Form
          id="lessonForm"
          layout="vertical"
          onFinish={handleLessonSubmit}
          initialValues={{ moduleId: selectedModule, type: "video", status: "draft" }}
        >
          <Form.Item name="moduleId" hidden>
            <Input />
          </Form.Item>

          <Form.Item
            name="title"
            label="Lesson Title"
            rules={[{ required: true, message: "Please enter lesson title" }]}
          >
            <Input placeholder="Enter lesson title" />
          </Form.Item>

          <Form.Item name="type" label="Lesson Type" rules={[{ required: true, message: "Please select lesson type" }]}>
            <Select>
              <Option value="video">Video</Option>
              <Option value="quiz">Quiz</Option>
              <Option value="assignment">Assignment</Option>
              <Option value="text">Text</Option>
            </Select>
          </Form.Item>

          <Form.Item name="duration" label="Duration (minutes)">
            <InputNumber min={1} style={{ width: "100%" }} placeholder="15" />
          </Form.Item>

          <Form.Item name="status" label="Status">
            <Select>
              <Option value="draft">Draft</Option>
              <Option value="published">Published</Option>
            </Select>
          </Form.Item>

          <Form.Item name="content" label="Content">
            <TextArea rows={3} placeholder="Enter lesson content or description" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CourseEditor
