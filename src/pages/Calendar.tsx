"use client"

import type React from "react"
import { useState } from "react"
import { Calendar as AntCalendar, Badge, Typography, Modal, List, Tag } from "antd"
import type { Dayjs } from "dayjs"

const { Title, Text } = Typography

interface EventProps {
  id: number
  title: string
  date: string
  type: "assignment" | "lecture" | "exam" | "deadline"
  course: string
  time?: string
  description?: string
}

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Sample data
  const events: EventProps[] = [
    {
      id: 1,
      title: "React Component Project Due",
      date: "2023-05-20",
      type: "deadline",
      course: "Introduction to React",
      time: "11:59 PM",
      description: "Final deadline for submitting the React component library project.",
    },
    {
      id: 2,
      title: "JavaScript Algorithms Assignment",
      date: "2023-05-18",
      type: "assignment",
      course: "Advanced JavaScript Concepts",
      time: "11:59 PM",
      description: "Submit your implementation of three sorting algorithms.",
    },
    {
      id: 3,
      title: "UI/UX Design Lecture",
      date: "2023-05-15",
      type: "lecture",
      course: "UI/UX Design Fundamentals",
      time: "10:00 AM",
      description: "Live lecture on advanced design principles and user testing.",
    },
    {
      id: 4,
      title: "Python Midterm Exam",
      date: "2023-05-22",
      type: "exam",
      course: "Introduction to Python",
      time: "2:00 PM",
      description: "Midterm examination covering all topics from weeks 1-5.",
    },
    {
      id: 5,
      title: "Web Development Office Hours",
      date: "2023-05-16",
      type: "lecture",
      course: "Introduction to React",
      time: "3:00 PM",
      description: "Virtual office hours with the instructor to discuss project requirements.",
    },
    {
      id: 6,
      title: "JavaScript Quiz",
      date: "2023-05-17",
      type: "exam",
      course: "Advanced JavaScript Concepts",
      time: "1:00 PM",
      description: "Short quiz on closures, promises, and async/await.",
    },
  ]

  const getEventsByDate = (date: string) => {
    return events.filter((event) => event.date === date)
  }

  const getListData = (value: Dayjs) => {
    const dateString = value.format("YYYY-MM-DD")
    return getEventsByDate(dateString)
  }

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value)

    return (
      <ul className="events p-0 m-0 list-none">
        {listData.map((item) => (
          <li key={item.id} className="mb-1">
            <Badge
              status={
                item.type === "assignment"
                  ? "processing"
                  : item.type === "lecture"
                    ? "success"
                    : item.type === "exam"
                      ? "error"
                      : "warning"
              }
              text={
                <Text ellipsis style={{ maxWidth: "100%" }}>
                  {item.title}
                </Text>
              }
            />
          </li>
        ))}
      </ul>
    )
  }

  const handleDateSelect = (date: Dayjs) => {
    setSelectedDate(date)
    const events = getEventsByDate(date.format("YYYY-MM-DD"))
    if (events.length > 0) {
      setIsModalOpen(true)
    }
  }

  const getEventTypeTag = (type: string) => {
    switch (type) {
      case "assignment":
        return <Tag color="blue">Assignment</Tag>
      case "lecture":
        return <Tag color="green">Lecture</Tag>
      case "exam":
        return <Tag color="red">Exam</Tag>
      case "deadline":
        return <Tag color="orange">Deadline</Tag>
      default:
        return <Tag color="default">{type}</Tag>
    }
  }

  return (
    <div>
      <Title level={2}>Calendar</Title>
      <Text type="secondary" className="block mb-6">
        View your schedule, deadlines, and upcoming events
      </Text>

      <div className="site-calendar-card">
        <AntCalendar cellRender={dateCellRender} onSelect={handleDateSelect} />
      </div>

      <Modal
        title={selectedDate ? `Events on ${selectedDate.format("MMMM D, YYYY")}` : "Events"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {selectedDate && (
          <List
            itemLayout="vertical"
            dataSource={getEventsByDate(selectedDate.format("YYYY-MM-DD"))}
            renderItem={(event) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <div className="flex justify-between items-start">
                      <Text strong>{event.title}</Text>
                      {getEventTypeTag(event.type)}
                    </div>
                  }
                  description={
                    <>
                      <div>Course: {event.course}</div>
                      {event.time && <div>Time: {event.time}</div>}
                    </>
                  }
                />
                {event.description && <div className="mt-2">{event.description}</div>}
              </List.Item>
            )}
          />
        )}
      </Modal>
    </div>
  )
}

export default Calendar
