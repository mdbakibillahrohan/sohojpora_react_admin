"use client";

import type React from "react";
import { useState } from "react";
import {
  Card,
  Typography,
  Tabs,
  DatePicker,
  Select,
  Row,
  Col,
  Statistic,
  Table,
  Tag,
  Progress,
  Button,
  Space,
} from "antd";
import {
  UserOutlined,
  BookOutlined,
  DollarOutlined,
  RiseOutlined,
  DownloadOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  StarOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

// Mock data for charts
const mockLineData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Enrollments",
      data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 150, 180, 210],
      borderColor: "#1890ff",
      backgroundColor: "rgba(24, 144, 255, 0.2)",
    },
    {
      label: "Revenue",
      data: [
        1500, 2000, 2250, 2500, 2450, 3000, 3500, 4550, 6250, 7500, 9000, 10500,
      ],
      borderColor: "#52c41a",
      backgroundColor: "rgba(82, 196, 26, 0.2)",
    },
  ],
};

// Mock data for tables
interface CourseAnalyticsData {
  key: string;
  rank: number;
  course: string;
  category: string;
  enrollments: number;
  completionRate: number;
  averageRating: number;
  revenue: number;
}

interface StudentAnalyticsData {
  key: string;
  rank: number;
  student: string;
  email: string;
  coursesEnrolled: number;
  coursesCompleted: number;
  totalHours: number;
  lastActive: string;
}

const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = useState<[string, string]>([
    "2023-01-01",
    "2023-12-31",
  ]);
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data for top courses
  const topCourses: CourseAnalyticsData[] = [
    {
      key: "1",
      rank: 1,
      course: "Advanced React Development",
      category: "Web Development",
      enrollments: 1245,
      completionRate: 68,
      averageRating: 4.8,
      revenue: 99592.55,
    },
    {
      key: "2",
      rank: 2,
      course: "Data Science Fundamentals",
      category: "Data Science",
      enrollments: 980,
      completionRate: 72,
      averageRating: 4.7,
      revenue: 58789.2,
    },
    {
      key: "3",
      rank: 3,
      course: "UI/UX Design Masterclass",
      category: "Design",
      enrollments: 875,
      completionRate: 65,
      averageRating: 4.9,
      revenue: 61236.25,
    },
    {
      key: "4",
      rank: 4,
      course: "Python for Machine Learning",
      category: "Data Science",
      enrollments: 760,
      completionRate: 58,
      averageRating: 4.6,
      revenue: 68391.4,
    },
    {
      key: "5",
      rank: 5,
      course: "Full Stack Web Development",
      category: "Web Development",
      enrollments: 690,
      completionRate: 52,
      averageRating: 4.5,
      revenue: 68993.1,
    },
  ];

  // Sample data for top students
  const topStudents: StudentAnalyticsData[] = [
    {
      key: "1",
      rank: 1,
      student: "John Smith",
      email: "john.smith@example.com",
      coursesEnrolled: 8,
      coursesCompleted: 6,
      totalHours: 124,
      lastActive: "2023-05-07",
    },
    {
      key: "2",
      rank: 2,
      student: "Emily Johnson",
      email: "emily.j@example.com",
      coursesEnrolled: 7,
      coursesCompleted: 5,
      totalHours: 112,
      lastActive: "2023-05-06",
    },
    {
      key: "3",
      rank: 3,
      student: "Michael Brown",
      email: "michael.b@example.com",
      coursesEnrolled: 6,
      coursesCompleted: 4,
      totalHours: 98,
      lastActive: "2023-05-05",
    },
    {
      key: "4",
      rank: 4,
      student: "Sarah Wilson",
      email: "sarah.w@example.com",
      coursesEnrolled: 5,
      coursesCompleted: 4,
      totalHours: 87,
      lastActive: "2023-05-04",
    },
    {
      key: "5",
      rank: 5,
      student: "David Lee",
      email: "david.lee@example.com",
      coursesEnrolled: 5,
      coursesCompleted: 3,
      totalHours: 76,
      lastActive: "2023-05-03",
    },
  ];

  const courseColumns: ColumnsType<CourseAnalyticsData> = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      width: 80,
      render: (rank) => <div className="text-center font-bold">{rank}</div>,
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
      render: (text, record) => (
        <div>
          <div className="font-medium">{text}</div>
          <Tag color="blue">{record.category}</Tag>
        </div>
      ),
    },
    {
      title: "Enrollments",
      dataIndex: "enrollments",
      key: "enrollments",
      sorter: (a, b) => a.enrollments - b.enrollments,
      render: (enrollments) => (
        <div className="font-medium">{enrollments.toLocaleString()}</div>
      ),
    },
    {
      title: "Completion Rate",
      dataIndex: "completionRate",
      key: "completionRate",
      sorter: (a, b) => a.completionRate - b.completionRate,
      render: (rate) => <Progress percent={rate} size="small" />,
    },
    {
      title: "Rating",
      dataIndex: "averageRating",
      key: "averageRating",
      sorter: (a, b) => a.averageRating - b.averageRating,
      render: (rating) => (
        <div className="flex items-center">
          {rating.toFixed(1)} <StarOutlined className="text-yellow-500 ml-1" />
        </div>
      ),
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
      sorter: (a, b) => a.revenue - b.revenue,
      render: (revenue) => (
        <div className="font-medium">
          $
          {revenue.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      ),
    },
  ];

  const studentColumns: ColumnsType<StudentAnalyticsData> = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      width: 80,
      render: (rank) => <div className="text-center font-bold">{rank}</div>,
    },
    {
      title: "Student",
      dataIndex: "student",
      key: "student",
      render: (text, record) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-xs text-gray-500">{record.email}</div>
        </div>
      ),
    },
    {
      title: "Courses Enrolled",
      dataIndex: "coursesEnrolled",
      key: "coursesEnrolled",
      sorter: (a, b) => a.coursesEnrolled - b.coursesEnrolled,
    },
    {
      title: "Courses Completed",
      dataIndex: "coursesCompleted",
      key: "coursesCompleted",
      sorter: (a, b) => a.coursesCompleted - b.coursesCompleted,
      render: (completed, record) => (
        <div>
          {completed}{" "}
          <Text type="secondary">
            ({Math.round((completed / record.coursesEnrolled) * 100)}%)
          </Text>
        </div>
      ),
    },
    {
      title: "Total Hours",
      dataIndex: "totalHours",
      key: "totalHours",
      sorter: (a, b) => a.totalHours - b.totalHours,
    },
    {
      title: "Last Active",
      dataIndex: "lastActive",
      key: "lastActive",
      sorter: (a, b) =>
        new Date(a.lastActive).getTime() - new Date(b.lastActive).getTime(),
      render: (date) => <div>{new Date(date).toLocaleDateString()}</div>,
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={2} className="mb-0">
            Analytics Dashboard
          </Title>
          <Text type="secondary">Track performance metrics and insights</Text>
        </div>
        <Space>
          <RangePicker
            defaultValue={[
              dayjs(new Date("2023-01-01")),
              dayjs(new Date("2023-12-31")),
            ]}
            format="YYYY-MM-DD"
            onChange={(dates, dateStrings) => {
              if (dates) {
                setDateRange([dateStrings[0], dateStrings[1]]);
              }
            }}
          />
          <Select defaultValue="all" style={{ width: 150 }}>
            <Option value="all">All Courses</Option>
            <Option value="web">Web Development</Option>
            <Option value="data">Data Science</Option>
            <Option value="design">Design</Option>
            <Option value="mobile">Mobile Development</Option>
          </Select>
          <Button icon={<DownloadOutlined />}>Export</Button>
        </Space>
      </div>

      {/* Overview Stats */}
      <Row gutter={[24, 24]} className="mb-6">
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Total Students"
              value={3245}
              prefix={<TeamOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
            <div className="mt-2 text-green-500 text-sm flex items-center">
              <RiseOutlined /> 12% increase
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Course Enrollments"
              value={5680}
              prefix={<BookOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
            <div className="mt-2 text-green-500 text-sm flex items-center">
              <RiseOutlined /> 8% increase
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Completion Rate"
              value={67}
              suffix="%"
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "#722ed1" }}
            />
            <div className="mt-2 text-green-500 text-sm flex items-center">
              <RiseOutlined /> 5% increase
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Total Revenue"
              value={356789.45}
              prefix={<DollarOutlined />}
              precision={2}
              valueStyle={{ color: "#eb2f96" }}
            />
            <div className="mt-2 text-green-500 text-sm flex items-center">
              <RiseOutlined /> 15% increase
            </div>
          </Card>
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Overview" key="overview">
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={16}>
              <Card
                title="Enrollment & Revenue Trends"
                bordered={false}
                className="shadow-sm"
                extra={
                  <Select defaultValue="year" style={{ width: 120 }}>
                    <Option value="year">Last 12 Months</Option>
                    <Option value="quarter">Last Quarter</Option>
                    <Option value="month">Last Month</Option>
                    <Option value="week">Last Week</Option>
                  </Select>
                }
              >
                <div className="h-80 flex items-center justify-center bg-gray-50 rounded">
                  <div className="text-center">
                    <RiseOutlined style={{ fontSize: 48, color: "#1890ff" }} />
                    <div className="mt-4">Line Chart Placeholder</div>
                    <div className="text-gray-500 text-sm mt-2">
                      Enrollment and Revenue Trends
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card
                title="Enrollment by Category"
                bordered={false}
                className="shadow-sm mb-6"
              >
                <div className="h-36 flex items-center justify-center bg-gray-50 rounded">
                  <div className="text-center">
                    <PieChartPlaceholder />
                    <div className="text-gray-500 text-sm mt-2">
                      Category Distribution
                    </div>
                  </div>
                </div>
              </Card>
              <Card
                title="Completion Rates"
                bordered={false}
                className="shadow-sm"
              >
                <div className="h-36 flex items-center justify-center bg-gray-50 rounded">
                  <div className="text-center">
                    <BarChartPlaceholder />
                    <div className="text-gray-500 text-sm mt-2">
                      Course Completion Rates
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>

          <Row gutter={[24, 24]} className="mt-6">
            <Col xs={24} md={12}>
              <Card
                title="Top Performing Courses"
                bordered={false}
                className="shadow-sm"
                extra={<a href="#">View All</a>}
              >
                <Table
                  dataSource={topCourses.slice(0, 5)}
                  columns={courseColumns.filter((col) =>
                    ["rank", "course", "enrollments", "revenue"].includes(
                      col.key as string
                    )
                  )}
                  pagination={false}
                  size="small"
                />
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card
                title="Most Active Students"
                bordered={false}
                className="shadow-sm"
                extra={<a href="#">View All</a>}
              >
                <Table
                  dataSource={topStudents.slice(0, 5)}
                  columns={studentColumns.filter((col) =>
                    [
                      "rank",
                      "student",
                      "coursesCompleted",
                      "lastActive",
                    ].includes(col.key as string)
                  )}
                  pagination={false}
                  size="small"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Course Analytics" key="courses">
          <Card bordered={false} className="shadow-sm mb-6">
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={8}>
                <Statistic
                  title="Total Courses"
                  value={42}
                  prefix={<BookOutlined />}
                />
              </Col>
              <Col xs={24} sm={8}>
                <Statistic
                  title="Average Completion Rate"
                  value={67}
                  suffix="%"
                  prefix={<CheckCircleOutlined />}
                />
              </Col>
              <Col xs={24} sm={8}>
                <Statistic
                  title="Average Rating"
                  value={4.6}
                  prefix={<StarOutlined />}
                />
              </Col>
            </Row>
          </Card>

          <Card
            title="Course Performance"
            bordered={false}
            className="shadow-sm"
            extra={
              <Space>
                <Select defaultValue="enrollments" style={{ width: 150 }}>
                  <Option value="enrollments">Sort by Enrollments</Option>
                  <Option value="completion">Sort by Completion Rate</Option>
                  <Option value="rating">Sort by Rating</Option>
                  <Option value="revenue">Sort by Revenue</Option>
                </Select>
                <Button icon={<DownloadOutlined />}>Export</Button>
              </Space>
            }
          >
            <Table
              dataSource={topCourses}
              columns={courseColumns}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>

        <TabPane tab="Student Analytics" key="students">
          <Card bordered={false} className="shadow-sm mb-6">
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={8}>
                <Statistic
                  title="Active Students"
                  value={2876}
                  prefix={<UserOutlined />}
                />
              </Col>
              <Col xs={24} sm={8}>
                <Statistic
                  title="Average Courses per Student"
                  value={2.3}
                  prefix={<BookOutlined />}
                />
              </Col>
              <Col xs={24} sm={8}>
                <Statistic
                  title="Average Study Time"
                  value={42}
                  suffix="hours"
                  prefix={<ClockCircleOutlined />}
                />
              </Col>
            </Row>
          </Card>

          <Row gutter={[24, 24]} className="mb-6">
            <Col xs={24} lg={12}>
              <Card
                title="Student Engagement"
                bordered={false}
                className="shadow-sm"
              >
                <div className="h-80 flex items-center justify-center bg-gray-50 rounded">
                  <div className="text-center">
                    <LineChartPlaceholder />
                    <div className="text-gray-500 text-sm mt-2">
                      Daily Active Students
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card
                title="Student Demographics"
                bordered={false}
                className="shadow-sm"
              >
                <div className="h-80 flex items-center justify-center bg-gray-50 rounded">
                  <div className="text-center">
                    <PieChartPlaceholder />
                    <div className="text-gray-500 text-sm mt-2">
                      Student Demographics
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>

          <Card
            title="Top Students"
            bordered={false}
            className="shadow-sm"
            extra={
              <Space>
                <Select defaultValue="courses" style={{ width: 180 }}>
                  <Option value="courses">Sort by Courses Completed</Option>
                  <Option value="hours">Sort by Total Hours</Option>
                  <Option value="active">Sort by Last Active</Option>
                </Select>
                <Button icon={<DownloadOutlined />}>Export</Button>
              </Space>
            }
          >
            <Table
              dataSource={topStudents}
              columns={studentColumns}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>

        <TabPane tab="Revenue Analytics" key="revenue">
          <Card bordered={false} className="shadow-sm mb-6">
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={8}>
                <Statistic
                  title="Total Revenue"
                  value={356789.45}
                  prefix={<DollarOutlined />}
                  precision={2}
                />
              </Col>
              <Col xs={24} sm={8}>
                <Statistic
                  title="Average Revenue per Course"
                  value={8494.99}
                  prefix={<DollarOutlined />}
                  precision={2}
                />
              </Col>
              <Col xs={24} sm={8}>
                <Statistic
                  title="Average Revenue per Student"
                  value={109.95}
                  prefix={<DollarOutlined />}
                  precision={2}
                />
              </Col>
            </Row>
          </Card>

          <Row gutter={[24, 24]} className="mb-6">
            <Col xs={24}>
              <Card
                title="Revenue Trends"
                bordered={false}
                className="shadow-sm"
                extra={
                  <Select defaultValue="monthly" style={{ width: 120 }}>
                    <Option value="monthly">Monthly</Option>
                    <Option value="quarterly">Quarterly</Option>
                    <Option value="yearly">Yearly</Option>
                  </Select>
                }
              >
                <div className="h-80 flex items-center justify-center bg-gray-50 rounded">
                  <div className="text-center">
                    <LineChartPlaceholder />
                    <div className="text-gray-500 text-sm mt-2">
                      Revenue Trends Over Time
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Card
                title="Revenue by Category"
                bordered={false}
                className="shadow-sm"
              >
                <div className="h-80 flex items-center justify-center bg-gray-50 rounded">
                  <div className="text-center">
                    <PieChartPlaceholder />
                    <div className="text-gray-500 text-sm mt-2">
                      Revenue Distribution by Category
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card
                title="Top Revenue Generating Courses"
                bordered={false}
                className="shadow-sm"
              >
                <Table
                  dataSource={topCourses
                    .sort((a, b) => b.revenue - a.revenue)
                    .slice(0, 5)}
                  columns={courseColumns.filter((col) =>
                    ["rank", "course", "enrollments", "revenue"].includes(
                      col.key as string
                    )
                  )}
                  pagination={false}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

// Placeholder components for charts
const LineChartPlaceholder = () => (
  <RiseOutlined style={{ fontSize: 48, color: "#1890ff" }} />
);

const BarChartPlaceholder = () => <BarChartOutlined />;

const PieChartPlaceholder = () => <PieChartOutlined />;

// Missing icon imports
const BarChartOutlined = () => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="bar-chart"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm-600-80h56c4.4 0 8-3.6 8-8V560c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v144c0 4.4 3.6 8 8 8zm152 0h56c4.4 0 8-3.6 8-8V384c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v320c0 4.4 3.6 8 8 8zm152 0h56c4.4 0 8-3.6 8-8V462c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v242c0 4.4 3.6 8 8 8zm152 0h56c4.4 0 8-3.6 8-8V304c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v400c0 4.4 3.6 8 8 8z"></path>
  </svg>
);

const PieChartOutlined = () => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="pie-chart"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M864 518H506V160c0-4.4-3.6-8-8-8h-26a398.46 398.46 0 00-282.8 117.1 398.19 398.19 0 00-117.1 282.9A398.57 398.57 0 00489 872c153.3 0 286.3-84.1 358.1-207.9 2.3-4 1.8-8.9-1.2-12.2l-19.8-19.8a7.95 7.95 0 00-11.3 0L763.2 684c-23.4 23.4-54.5 36.3-87.6 36.3-68.4 0-123.9-55.5-123.9-123.9 0-33.1 12.9-64.2 36.3-87.6l51.5-51.5a8.01 8.01 0 000-11.3l-19.8-19.8a7.95 7.95 0 00-12.2-1.2c-84.6 49.4-142.1 138.3-142.1 241 0 152.2 123.8 276 276 276 102.7 0 191.6-57.5 241-142.1 2.3-4 1.8-8.9-1.2-12.2l-19.8-19.8a7.95 7.95 0 00-11.3 0l-51.5 51.5a122.85 122.85 0 00-36.3 87.6c0 68.4 55.5 123.9 123.9 123.9 33.1 0 64.2-12.9 87.6-36.3l51.5-51.5a8.01 8.01 0 000-11.3l-19.8-19.8a7.95 7.95 0 00-12.2-1.2C759.4 833.7 670.5 872 568 872c-194.4 0-352-157.6-352-352 0-194.4 157.6-352 352-352h326c4.4 0 8-3.6 8-8v-26c0-4.4-3.6-8-8-8H568c-229.8 0-416 186.2-416 416 0 229.8 186.2 416 416 416 229.8 0 416-186.2 416-416v-26c0-4.4-3.6-8-8-8z"></path>
  </svg>
);

export default Analytics;
