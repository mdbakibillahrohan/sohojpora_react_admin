import { ConfigProvider } from "antd"
import MainLayout from "./layouts/MainLayout"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import AdminDashboard from "./pages/AdminDashboard"
import UserManagement from "./pages/UserManagement"
import CourseManagement from "./pages/CourseManagement"
import CourseEditor from "./pages/CourseEditor"
import EnrollmentManagement from "./pages/EnrollmentManagement"
import ContentLibrary from "./pages/ContentLibrary"
import Analytics from "./pages/Analytics"
import Settings from "./pages/Settings"

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#3E63DD",
          borderRadius: 6,

          // Alias Token
          colorBgContainer: "#ffffff",
        },
      }}
    >
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/courses" element={<CourseManagement />} />
            <Route path="/courses/:id" element={<CourseEditor />} />
            <Route path="/enrollments" element={<EnrollmentManagement />} />
            <Route path="/content" element={<ContentLibrary />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </MainLayout>
      </Router>
    </ConfigProvider>
  )
}

export default App
