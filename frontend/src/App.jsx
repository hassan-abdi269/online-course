import { Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes';
import AdminLayout from './layouts/AdminLayout';
import PublicLayout from './layouts/PublicLayout';
import StudentLayout from './layouts/StudentLayout';
import CourseDetails from './pages/public/CourseDetails';
import Courses from './pages/public/Courses';
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import StudentDashboard from './pages/student/Dashboard';
import MyCourses from './pages/student/MyCourses';
import CourseLearning from './pages/student/CourseLearning';
import Quiz from './pages/student/Quiz';
import Progress from './pages/student/Progress';
import Certificates from './pages/student/Certificates';
import Profile from './pages/student/Profile';
import AdminDashboard from './pages/admin/Dashboard';
import ManageCourses from './pages/admin/Courses';
import CourseForm from './pages/admin/CourseForm';
import AdminStudents from './pages/admin/Students';
import AdminInstructors from './pages/admin/Instructors';
import AdminCategories from './pages/admin/Categories';
import AdminSettings from './pages/admin/Settings';

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoutes allowedRole="student" />}>
        <Route element={<StudentLayout />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/courses" element={<MyCourses />} />
          <Route path="/student/courses/:id" element={<CourseLearning />} />
          <Route path="/student/courses/:id/quiz" element={<Quiz />} />
          <Route path="/student/progress" element={<Progress />} />
          <Route path="/student/certificates" element={<Certificates />} />
          <Route path="/student/profile" element={<Profile />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoutes allowedRole="admin" />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/courses" element={<ManageCourses />} />
          <Route path="/admin/courses/new" element={<CourseForm />} />
          <Route path="/admin/courses/:id/edit" element={<CourseForm />} />
          <Route path="/admin/students" element={<AdminStudents />} />
          <Route path="/admin/instructors" element={<AdminInstructors />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
