import React, { useState } from "react";
import {
  Layout,
  Card,
  Button,
  Table,
  Modal,
  Upload,
  message,
  Space,
  Tag,
  Dropdown,
  Input,
  Select,
  Form,
  List,
  Avatar,
  Tooltip,
  Badge,
  Row,
  Col,
  Divider,
  Typography,
  Drawer,
  Tabs,
} from "antd";
import {
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  MoreOutlined,
  ZoomOutOutlined,
  LeftOutlined,
  MenuOutlined,
  PlayCircleOutlined,
  ReadOutlined,
  LikeOutlined,
  DislikeOutlined,
  MessageOutlined,
  SearchOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import type { UploadProps } from "antd";
import type { ColumnsType } from "antd/es/table";

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Dragger } = Upload;
const { TabPane } = Tabs;

// --- Interfaces for type safety ---

interface Book {
  id: number;
  title: string;
  fileName: string;
  uploadDate: string;
  totalPages: number;
  status: string;
}

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

interface Video {
  id: number;
  title: string;
  duration: string;
  thumbnail: string;
  url: string;
  likes: number;
  dislikes: number;
  comments: Comment[];
}

interface Note {
  id: number;
  title: string;
  content: string;
  createdDate: string;
}

interface PageButton {
  id: number;
  type: "video" | "note";
  order: number;
  videoId?: number;
  noteId?: number;
}

interface PageButtons {
  [key: number]: PageButton[];
}

// --- BookManager Component ---

const BookManager: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([
    {
      id: 1,
      title: "JavaScript Fundamentals",
      fileName: "js-fundamentals.pdf",
      uploadDate: "2024-01-15",
      totalPages: 5,
      status: "Active",
    },
    {
      id: 2,
      title: "React Advanced Concepts",
      fileName: "react-advanced.pdf",
      uploadDate: "2024-01-10",
      totalPages: 4,
      status: "Active",
    },
  ]);

  const [videos] = useState<Video[]>([
    {
      id: 1,
      title: "Introduction to Variables",
      duration: "5:30",
      thumbnail: "/api/placeholder/100/60",
      url: "https://example.com/video1.mp4",
      likes: 120,
      dislikes: 5,
      comments: [
        {
          id: 1,
          author: "Alice",
          text: "Very clear explanation!",
          date: "2024-02-01",
        },
        { id: 2, author: "Bob", text: "Helped me a lot!", date: "2024-02-03" },
      ],
    },
    {
      id: 2,
      title: "Functions Deep Dive",
      duration: "8:45",
      thumbnail: "/api/placeholder/100/60",
      url: "https://example.com/video2.mp4",
      likes: 80,
      dislikes: 2,
      comments: [
        {
          id: 3,
          author: "Charlie",
          text: "Great content!",
          date: "2024-01-25",
        },
      ],
    },
    {
      id: 3,
      title: "React Hooks Explained",
      duration: "12:15",
      thumbnail: "/api/placeholder/100/60",
      url: "https://example.com/video3.mp4",
      likes: 200,
      dislikes: 10,
      comments: [
        { id: 4, author: "David", text: "Mind-blowing!", date: "2024-03-10" },
        {
          id: 5,
          author: "Eve",
          text: "Best explanation ever.",
          date: "2024-03-12",
        },
      ],
    },
    {
      id: 4,
      title: "State Management",
      duration: "10:22",
      thumbnail: "/api/placeholder/100/60",
      url: "https://example.com/video4.mp4",
      likes: 150,
      dislikes: 7,
      comments: [],
    },
    {
      id: 5,
      title: "Asynchronous JavaScript",
      duration: "15:00",
      thumbnail: "/api/placeholder/100/60",
      url: "https://example.com/video5.mp4",
      likes: 90,
      dislikes: 3,
      comments: [
        {
          id: 6,
          author: "Frank",
          text: "A bit complex, but helpful.",
          date: "2024-04-01",
        },
      ],
    },
    {
      id: 6,
      title: "Component Lifecycle",
      duration: "7:00",
      thumbnail: "/api/placeholder/100/60",
      url: "https://example.com/video6.mp4",
      likes: 110,
      dislikes: 1,
      comments: [],
    },
    {
      id: 7,
      title: "Context API Demystified",
      duration: "11:30",
      thumbnail: "/api/placeholder/100/60",
      url: "https://example.com/video7.mp4",
      likes: 180,
      dislikes: 6,
      comments: [
        {
          id: 7,
          author: "Grace",
          text: "Finally understood Context!",
          date: "2024-05-05",
        },
      ],
    },
    {
      id: 8,
      title: "Redux Fundamentals",
      duration: "20:00",
      thumbnail: "/api/placeholder/100/60",
      url: "https://example.com/video8.mp4",
      likes: 250,
      dislikes: 15,
      comments: [],
    },
  ]);

  const [notes] = useState<Note[]>([
    {
      id: 1,
      title: "Key Concepts Summary",
      content:
        "Important points to remember about JavaScript variables and scope. Variables are containers for storing data values. There are three ways to declare a variable: var, let, and const. 'var' has function scope, 'let' and 'const' have block scope. 'const' variables cannot be reassigned.",
      createdDate: "2024-01-20",
    },
    {
      id: 2,
      title: "Best Practices",
      content:
        "Follow these coding standards for better code quality and maintainability: Use meaningful variable names, comment your code, keep functions small and focused, and handle errors gracefully. Employ ES6 features for cleaner syntax.",
      createdDate: "2024-01-18",
    },
    {
      id: 3,
      title: "Common Mistakes",
      content:
        "Avoid these common pitfalls when writing JavaScript code: Forgetting to declare variables (leading to global variables), not understanding 'this' context, excessive nesting of callbacks (callback hell), and improper error handling. Always use strict mode.",
      createdDate: "2024-01-16",
    },
    {
      id: 4,
      title: "React Component Patterns",
      content:
        "Explore common React component patterns: Higher-Order Components (HOCs), Render Props, and Custom Hooks. Each pattern offers a unique way to reuse logic and UI. Custom Hooks are generally preferred for stateful logic reuse.",
      createdDate: "2024-02-10",
    },
    {
      id: 5,
      title: "JSX Deep Dive",
      content:
        "Understanding JSX is crucial for React development. It's a syntax extension for JavaScript that allows you to write HTML-like structures in your JavaScript code. JSX gets transpiled into `React.createElement()` calls. Remember to always close tags.",
      createdDate: "2024-02-15",
    },
    {
      id: 6,
      title: "State vs. Props",
      content:
        "Differentiate between state and props in React. Props are read-only and passed from parent to child. State is mutable and managed within the component itself. Changes in state trigger re-renders. Use `useState` hook for functional components.",
      createdDate: "2024-02-20",
    },
  ]);

  const [pageButtons, setPageButtons] = useState<PageButtons>({
    1: [
      { id: 1, type: "video", videoId: 1, order: 0 },
      { id: 2, type: "note", noteId: 1, order: 1 },
      { id: 3, type: "video", videoId: 2, order: 2 },
    ],
    2: [
      { id: 4, type: "video", videoId: 3, order: 0 },
      { id: 5, type: "note", noteId: 2, order: 1 },
    ],
    3: [{ id: 6, type: "video", videoId: 1, order: 0 }],
  });

  const [uploadModalVisible, setUploadModalVisible] = useState<boolean>(false);
  const [viewerVisible, setViewerVisible] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [buttonModalVisible, setButtonModalVisible] = useState<boolean>(false);
  const [selectedButtonType, setSelectedButtonType] = useState<
    "video" | "note"
  >("video");
  const [videoModalVisible, setVideoModalVisible] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [noteModalVisible, setNoteModalVisible] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [editingPage, setEditingPage] = useState<number | null>(null);

  // States for search and pagination in "Add Button" modal
  const [resourceSelectionModalVisible, setResourceSelectionModalVisible] =
    useState<boolean>(false);
  const [resourceSearchTerm, setResourceSearchTerm] = useState<string>("");
  const [resourceCurrentPage, setResourceCurrentPage] = useState<number>(1);
  const resourcePageSize = 5; // Items per page for resource selection
  const [selectedResourceId, setSelectedResourceId] = useState<number | null>(
    null
  );
  const [resourceSelectionType, setResourceSelectionType] = useState<
    "video" | "note"
  >("video"); // 'video' or 'note'

  // States for search in Resources Drawer
  const [drawerVideoSearchTerm, setDrawerVideoSearchTerm] =
    useState<string>("");
  const [drawerNoteSearchTerm, setDrawerNoteSearchTerm] = useState<string>("");

  //   const pdfViewerRef = useRef<HTMLDivElement>(null); // Use HTMLDivElement for ref type
  const [buttonForm] = Form.useForm();

  const bookColumns: ColumnsType<Book> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "File Name",
      dataIndex: "fileName",
      key: "fileName",
    },
    {
      title: "Upload Date",
      dataIndex: "uploadDate",
      key: "uploadDate",
    },
    {
      title: "Pages",
      dataIndex: "totalPages",
      key: "totalPages",
      render: (pages) => <Tag color="blue">{pages} pages</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEditBook(record)}
          >
            Edit
          </Button>
          <Button icon={<EyeOutlined />} onClick={() => handleViewBook(record)}>
            View
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteBook(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleUpload: UploadProps["onChange"] = (info) => {
    const { status } = info.file;
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
      const newBook: Book = {
        id: books.length + 1,
        title: info.file.name.replace(".pdf", ""),
        fileName: info.file.name,
        uploadDate: new Date().toISOString().split("T")[0],
        totalPages: Math.floor(Math.random() * 10) + 3,
        status: "Active",
      };
      setBooks([...books, newBook]);
      setUploadModalVisible(false);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleEditBook = (book: Book) => {
    setSelectedBook(book);
    setViewerVisible(true);
    // setCurrentPage(1); // Removed as it's not used in current viewer logic
    setDrawerVisible(true);
  };

  const handleViewBook = (book: Book) => {
    setSelectedBook(book);
    setViewerVisible(true);
    // setCurrentPage(1); // Removed
  };

  const handleDeleteBook = (id: number) => {
    setBooks(books.filter((book) => book.id !== id));
    message.success("Book deleted successfully");
  };

  const handleAddButton = (pageNumber: number) => {
    setEditingPage(pageNumber);
    setButtonModalVisible(true);
    buttonForm.resetFields();
    setSelectedButtonType("video");
    setSelectedResourceId(null); // Ensure no resource is pre-selected
  };

  const handleButtonSubmit = () => {
    if (selectedResourceId === null) {
      message.error("Please select a resource.");
      return;
    }

    const newButton: PageButton = {
      id: Date.now(),
      type: selectedButtonType,
      order: (pageButtons[editingPage!] || []).length, // Use non-null assertion for editingPage
    };

    if (selectedButtonType === "video") {
      newButton.videoId = selectedResourceId;
    } else {
      newButton.noteId = selectedResourceId;
    }

    setPageButtons((prev) => ({
      ...prev,
      [editingPage!]: [...(prev[editingPage!] || []), newButton], // Non-null assertion
    }));

    setButtonModalVisible(false);
    setEditingPage(null);
    setSelectedResourceId(null);
    message.success("Button added successfully");
  };

  const handleButtonClick = (button: PageButton) => {
    if (button.type === "video") {
      const video = videos.find((v) => v.id === button.videoId);
      setSelectedVideo(video || null); // Ensure null if not found
      setVideoModalVisible(true);
    } else {
      const note = notes.find((n) => n.id === button.noteId);
      setSelectedNote(note || null); // Ensure null if not found
      setNoteModalVisible(true);
    }
  };

  //   const handleRemoveButton = (pageNumber: number, buttonId: number) => {
  //     setPageButtons((prev) => ({
  //       ...prev,
  //       [pageNumber]: prev[pageNumber].filter((button) => button.id !== buttonId),
  //     }));
  //     message.success("Button removed successfully");
  //   };

  const renderPageButtons = (pageNumber: number) => {
    const buttons = pageButtons[pageNumber] || [];
    const maxVisibleButtons = 4;
    const visibleButtons = buttons.slice(0, maxVisibleButtons);
    const hiddenButtons = buttons.slice(maxVisibleButtons);

    return (
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {visibleButtons.map((button) => {
          const isVideo = button.type === "video";
          const item = isVideo
            ? videos.find((v) => v.id === button.videoId)
            : notes.find((n) => n.id === button.noteId);

          if (!item) return null; // Handle case where item might not be found

          return (
            <Tooltip key={button.id} title={item.title}>
              <Button
                type="primary"
                shape="round"
                size="small"
                icon={isVideo ? <PlayCircleOutlined /> : <ReadOutlined />}
                onClick={() => handleButtonClick(button)}
                style={{
                  backgroundColor: isVideo ? "#ff4d4f" : "#1890ff",
                  borderColor: isVideo ? "#ff4d4f" : "#1890ff",
                }}
              >
                {isVideo ? "Video" : "Note"}
              </Button>
            </Tooltip>
          );
        })}

        {hiddenButtons.length > 0 && (
          <Dropdown
            overlay={
              <div
                style={{
                  backgroundColor: "white",
                  padding: "8px",
                  borderRadius: "4px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              >
                {hiddenButtons.map((button) => {
                  const isVideo = button.type === "video";
                  const item = isVideo
                    ? videos.find((v) => v.id === button.videoId)
                    : notes.find((n) => n.id === button.noteId);

                  if (!item) return null; // Handle case where item might not be found

                  return (
                    <Button
                      key={button.id}
                      type="text"
                      icon={isVideo ? <PlayCircleOutlined /> : <ReadOutlined />}
                      onClick={() => handleButtonClick(button)}
                      style={{
                        display: "block",
                        marginBottom: "4px",
                        textAlign: "left",
                      }}
                    >
                      {item.title}
                    </Button>
                  );
                })}
              </div>
            }
            trigger={["click"]}
          >
            <Badge count={hiddenButtons.length}>
              <Button
                type="primary"
                shape="round"
                size="small"
                icon={<MoreOutlined />}
              >
                More
              </Button>
            </Badge>
          </Dropdown>
        )}
      </div>
    );
  };

  const renderPdfPages = () => {
    const pages = [];
    for (let i = 1; i <= (selectedBook?.totalPages || 1); i++) {
      pages.push(
        <div key={i} style={{ marginBottom: "32px" }}>
          <Card
            title={`Page ${i}`}
            extra={
              <Button
                type="dashed"
                size="small"
                icon={<PlusOutlined />}
                onClick={() => handleAddButton(i)}
              >
                Add Button
              </Button>
            }
            style={{ width: "100%" }}
          >
            <div
              style={{
                width: "100%",
                height: "600px",
                backgroundColor: "#fafafa",
                border: "1px solid #d9d9d9",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
                position: "relative",
                transform: `scale(${zoom})`,
                transformOrigin: "center top",
              }}
            >
              <div style={{ textAlign: "center", color: "#999" }}>
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>
                  📄 PDF Page {i}
                </div>
                <div style={{ fontSize: "14px" }}>{selectedBook?.fileName}</div>
              </div>
            </div>

            {/* Bottom buttons section */}
            <div
              style={{
                borderTop: "1px solid #f0f0f0",
                paddingTop: "16px",
                minHeight: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {pageButtons[i] && pageButtons[i].length > 0 ? (
                renderPageButtons(i)
              ) : (
                <Text type="secondary" style={{ fontStyle: "italic" }}>
                  No buttons added yet
                </Text>
              )}
            </div>
          </Card>
        </div>
      );
    }
    return pages;
  };

  // Filtered and paginated resources for "Add Button" modal
  const filteredVideosForSelection = videos.filter((video) =>
    video.title.toLowerCase().includes(resourceSearchTerm.toLowerCase())
  );
  const paginatedVideosForSelection = filteredVideosForSelection.slice(
    (resourceCurrentPage - 1) * resourcePageSize,
    resourceCurrentPage * resourcePageSize
  );

  const filteredNotesForSelection = notes.filter((note) =>
    note.title.toLowerCase().includes(resourceSearchTerm.toLowerCase())
  );
  const paginatedNotesForSelection = filteredNotesForSelection.slice(
    (resourceCurrentPage - 1) * resourcePageSize,
    resourceCurrentPage * resourcePageSize
  );

  // Columns for resource selection table
  const videoSelectionColumns: ColumnsType<Video> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          onClick={() => {
            setSelectedResourceId(record.id);
            buttonForm.setFieldsValue({ videoId: record.title });
            setResourceSelectionModalVisible(false);
          }}
        >
          Select
        </Button>
      ),
    },
  ];

  const noteSelectionColumns: ColumnsType<Note> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          onClick={() => {
            setSelectedResourceId(record.id);
            buttonForm.setFieldsValue({ noteId: record.title });
            setResourceSelectionModalVisible(false);
          }}
        >
          Select
        </Button>
      ),
    },
  ];

  // Filtered resources for Resources Drawer
  const filteredDrawerVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(drawerVideoSearchTerm.toLowerCase())
  );
  const filteredDrawerNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(drawerNoteSearchTerm.toLowerCase())
  );

  if (viewerVisible) {
    return (
      <Layout style={{ height: "100vh" }}>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            position: "sticky",
            top: 0,
            zIndex: 1000,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              icon={<LeftOutlined />}
              onClick={() => setViewerVisible(false)}
              style={{ marginRight: 16 }}
            >
              Back
            </Button>
            <Title level={4} style={{ margin: 0, color: "white" }}>
              {selectedBook?.title}
            </Title>
          </div>
          <Space>
            <Button
              icon={<MenuOutlined />}
              onClick={() => setDrawerVisible(true)}
            >
              Resources
            </Button>
            <Button
              icon={<ZoomOutOutlined />}
              onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
            />
            <span style={{ color: "white" }}>{Math.round(zoom * 100)}%</span>
            <Button
              icon={<ZoomOutOutlined />}
              onClick={() => setZoom(Math.min(2, zoom + 0.1))}
            />
          </Space>
        </Header>

        <Content
          style={{
            padding: "24px",
            overflow: "auto",
            backgroundColor: "#f5f5f5",
          }}
        >
          <div
            style={{
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            {renderPdfPages()}
          </div>
        </Content>

        {/* Resources Drawer */}
        <Drawer
          title="Resources"
          placement="right"
          width={400}
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
        >
          <Tabs defaultActiveKey="videos">
            <TabPane tab="Videos" key="videos">
              <Input.Search
                placeholder="Search videos"
                allowClear
                onSearch={setDrawerVideoSearchTerm}
                style={{ marginBottom: 16 }}
              />
              <List
                dataSource={filteredDrawerVideos}
                renderItem={(video) => (
                  <List.Item
                    actions={[
                      <Button
                        type="text"
                        icon={<PlayCircleOutlined />}
                        onClick={() => {
                          setSelectedVideo(video);
                          setVideoModalVisible(true);
                        }}
                      >
                        Play
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar shape="square" src={video.thumbnail} />}
                      title={video.title}
                      description={`Duration: ${video.duration}`}
                    />
                  </List.Item>
                )}
              />
            </TabPane>
            <TabPane tab="Notes" key="notes">
              <Input.Search
                placeholder="Search notes"
                allowClear
                onSearch={setDrawerNoteSearchTerm}
                style={{ marginBottom: 16 }}
              />
              <List
                dataSource={filteredDrawerNotes}
                renderItem={(note) => (
                  <List.Item
                    actions={[
                      <Button
                        type="text"
                        icon={<ReadOutlined />}
                        onClick={() => {
                          setSelectedNote(note);
                          setNoteModalVisible(true);
                        }}
                      >
                        Read
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar icon={<FileTextOutlined />} />}
                      title={note.title}
                      description={note.createdDate}
                    />
                  </List.Item>
                )}
              />
            </TabPane>
          </Tabs>
        </Drawer>

        {/* Add Button Modal */}
        <Modal
          title="Add Button to Page"
          open={buttonModalVisible}
          onCancel={() => {
            setButtonModalVisible(false);
            setSelectedResourceId(null);
            buttonForm.resetFields();
          }}
          onOk={() => buttonForm.submit()}
        >
          <Form
            form={buttonForm}
            id="button-form"
            onFinish={handleButtonSubmit}
            layout="vertical"
            initialValues={{ type: "video" }}
          >
            <Form.Item name="type" label="Button Type">
              <Select
                value={selectedButtonType}
                onChange={(value: "video" | "note") => {
                  setSelectedButtonType(value);
                  setSelectedResourceId(null);
                  buttonForm.setFieldsValue({
                    videoId: undefined,
                    noteId: undefined,
                  });
                }}
                options={[
                  { value: "video", label: "Video" },
                  { value: "note", label: "Note" },
                ]}
              />
            </Form.Item>

            {selectedButtonType === "video" ? (
              <Form.Item
                name="videoId"
                label="Select Video"
                rules={[{ required: true, message: "Please select a video!" }]}
              >
                <Input
                  readOnly
                  placeholder="Click to select a video"
                  onClick={() => {
                    setResourceSelectionType("video");
                    setResourceSearchTerm("");
                    setResourceCurrentPage(1);
                    setResourceSelectionModalVisible(true);
                  }}
                  suffix={<SearchOutlined />}
                  value={
                    selectedResourceId
                      ? videos.find((v) => v.id === selectedResourceId)?.title
                      : ""
                  }
                />
              </Form.Item>
            ) : (
              <Form.Item
                name="noteId"
                label="Select Note"
                rules={[{ required: true, message: "Please select a note!" }]}
              >
                <Input
                  readOnly
                  placeholder="Click to select a note"
                  onClick={() => {
                    setResourceSelectionType("note");
                    setResourceSearchTerm("");
                    setResourceCurrentPage(1);
                    setResourceSelectionModalVisible(true);
                  }}
                  suffix={<SearchOutlined />}
                  value={
                    selectedResourceId
                      ? notes.find((n) => n.id === selectedResourceId)?.title
                      : ""
                  }
                />
              </Form.Item>
            )}
          </Form>
        </Modal>

        {/* Resource Selection Modal (for Add Button) */}
        <Modal
          title={`Select ${
            resourceSelectionType === "video" ? "Video" : "Note"
          }`}
          open={resourceSelectionModalVisible}
          onCancel={() => setResourceSelectionModalVisible(false)}
          footer={null}
          width={700}
        >
          <Input.Search
            placeholder={`Search ${
              resourceSelectionType === "video" ? "videos" : "notes"
            }`}
            allowClear
            onSearch={setResourceSearchTerm}
            style={{ marginBottom: 16 }}
          />
          {resourceSelectionType === "video" ? (
            <Table
              columns={videoSelectionColumns}
              dataSource={paginatedVideosForSelection}
              rowKey="id"
              pagination={{
                current: resourceCurrentPage,
                pageSize: resourcePageSize,
                total: filteredVideosForSelection.length,
                onChange: (page: number) => setResourceCurrentPage(page),
              }}
            />
          ) : (
            <Table
              columns={noteSelectionColumns}
              dataSource={paginatedNotesForSelection}
              rowKey="id"
              pagination={{
                current: resourceCurrentPage,
                pageSize: resourcePageSize,
                total: filteredNotesForSelection.length,
                onChange: (page: number) => setResourceCurrentPage(page),
              }}
            />
          )}
        </Modal>

        {/* Video Modal */}
        <Modal
          title="Video Player"
          open={videoModalVisible}
          onCancel={() => setVideoModalVisible(false)}
          footer={null}
          width={800}
        >
          {selectedVideo && (
            <div>
              <Title level={4}>{selectedVideo.title}</Title>
              <div
                style={{
                  width: "100%",
                  height: "400px",
                  backgroundColor: "#000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  borderRadius: "4px",
                  marginBottom: "16px",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <PlayCircleOutlined
                    style={{ fontSize: "48px", marginBottom: "16px" }}
                  />
                  <div>Video Player Placeholder</div>
                  <div style={{ fontSize: "14px", opacity: 0.8 }}>
                    Duration: {selectedVideo.duration}
                  </div>
                </div>
              </div>

              {/* Like, Dislike, Comments */}
              <Row gutter={16} style={{ marginBottom: "16px" }}>
                <Col>
                  <Space>
                    <Tooltip title="Likes">
                      <Button type="text" icon={<LikeOutlined />}>
                        {selectedVideo.likes}
                      </Button>
                    </Tooltip>
                    <Tooltip title="Dislikes">
                      <Button type="text" icon={<DislikeOutlined />}>
                        {selectedVideo.dislikes}
                      </Button>
                    </Tooltip>
                    <Tooltip title="Comments">
                      <Button type="text" icon={<MessageOutlined />}>
                        {selectedVideo.comments.length}
                      </Button>
                    </Tooltip>
                  </Space>
                </Col>
              </Row>
              <Divider orientation="left">Comments</Divider>
              <div
                style={{
                  maxHeight: "200px",
                  overflowY: "auto",
                  paddingRight: "8px",
                }}
              >
                {selectedVideo.comments.length > 0 ? (
                  <List
                    dataSource={selectedVideo.comments}
                    renderItem={(comment) => (
                      <List.Item>
                        <List.Item.Meta
                          title={<Text strong>{comment.author}</Text>}
                          description={
                            <>
                              <Text
                                type="secondary"
                                style={{ fontSize: "12px" }}
                              >
                                {comment.date}
                              </Text>
                              <br />
                              {comment.text}
                            </>
                          }
                        />
                      </List.Item>
                    )}
                  />
                ) : (
                  <Text type="secondary" style={{ fontStyle: "italic" }}>
                    No comments yet.
                  </Text>
                )}
              </div>
            </div>
          )}
        </Modal>

        {/* Note Modal */}
        <Modal
          title="Note"
          open={noteModalVisible}
          onCancel={() => setNoteModalVisible(false)}
          footer={null}
          width={600}
        >
          {selectedNote && (
            <div>
              <Title level={4}>{selectedNote.title}</Title>
              <Text type="secondary" style={{ fontSize: "12px" }}>
                Created: {selectedNote.createdDate}
              </Text>
              <Divider />
              <div
                style={{
                  fontSize: "14px",
                  lineHeight: "1.6",
                  padding: "16px",
                  backgroundColor: "#fafafa",
                  borderRadius: "4px",
                }}
              >
                {selectedNote.content}
              </div>
            </div>
          )}
        </Modal>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title level={3} style={{ margin: 0, color: "white" }}>
          Book Manager
        </Title>
        <Button
          type="primary"
          icon={<UploadOutlined />}
          onClick={() => setUploadModalVisible(true)}
        >
          Upload Book
        </Button>
      </Header>

      <Content style={{ padding: "24px" }}>
        <Card>
          <Table
            columns={bookColumns}
            dataSource={books}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </Content>

      {/* Upload Modal */}
      <Modal
        title="Upload PDF Book"
        open={uploadModalVisible}
        onCancel={() => setUploadModalVisible(false)}
        footer={null}
        width={600}
      >
        <Dragger
          name="file"
          multiple={false}
          accept=".pdf"
          action="/api/upload" // Placeholder, replace with your actual upload endpoint
          onChange={handleUpload}
        >
          <p className="ant-upload-drag-icon">
            <UploadOutlined style={{ fontSize: "48px" }} />
          </p>
          <p className="ant-upload-text">
            Click or drag PDF file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for single PDF file upload only. Maximum file size: 50MB
          </p>
        </Dragger>
      </Modal>
    </Layout>
  );
};

export default BookManager;
