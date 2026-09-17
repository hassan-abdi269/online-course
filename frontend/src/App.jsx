import { Link, Route, Routes } from 'react-router-dom';
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

function PlaceholderPage({ title, description }) { return <section className="mx-auto max-w-5xl px-4 py-20"><div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft"><h1 className="text-4xl font-extrabold text-slate-900">{title}</h1><p className="mt-4 text-lg text-slate-600">{description}</p><Link to="/courses" className="mt-8 inline-flex rounded-xl bg-primary-500 px-5 py-3 font-semibold text-white">Explore courses</Link></div></section>; }
function App() { return <Routes><Route element={<PublicLayout />}><Route path="/" element={<Home />} /><Route path="/courses" element={<Courses />} /><Route path="/courses/:id" element={<CourseDetails />} /><Route path="/categories" element={<PlaceholderPage title="Categories" description="Explore course categories on LearnHub." />} /><Route path="/about" element={<PlaceholderPage title="About LearnHub" description="Learn more about our e-learning platform." />} /><Route path="/contact" element={<PlaceholderPage title="Contact" description="The contact page is being prepared." />} /><Route path="/login" element={<Login />} /><Route path="/register" element={<Register />} /></Route><Route element={<ProtectedRoutes allowedRole="student" />}><Route element={<StudentLayout />}><Route path="/student/dashboard" element={<StudentDashboard />} /><Route path="/student/courses" element={<MyCourses />} /><Route path="/student/learning/:id" element={<CourseLearning />} /><Route path="/student/quiz/:id" element={<Quiz />} /><Route path="/student/progress" element={<Progress />} /><Route path="/student/certificates" element={<Certificates />} /><Route path="/student/profile" element={<Profile />} /></Route></Route><Route element={<ProtectedRoutes allowedRole="admin" />}><Route element={<AdminLayout />}><Route path="/admin/dashboard" element={<PlaceholderPage title="Admin Dashboard" description="Platform analytics and overview will appear here." />} /><Route path="/admin/courses" element={<PlaceholderPage title="Manage Courses" description="Course CRUD will be added soon." />} /><Route path="/admin/students" element={<PlaceholderPage title="Students" description="Student management will be added soon." />} /><Route path="/admin/instructors" element={<PlaceholderPage title="Instructors" description="Instructor management will be added soon." />} /><Route path="/admin/categories" element={<PlaceholderPage title="Categories" description="Category CRUD will be added soon." />} /><Route path="/admin/settings" element={<PlaceholderPage title="Settings" description="Website settings will be added soon." />} /></Route></Route><Route path="*" element={<PlaceholderPage title="Page not found" description="The page you requested does not exist." />} /></Routes>; }
export default App;
