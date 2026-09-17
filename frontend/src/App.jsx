import { Link, Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes';
import AdminLayout from './layouts/AdminLayout';
import PublicLayout from './layouts/PublicLayout';
import StudentLayout from './layouts/StudentLayout';

function PlaceholderPage({ title, description }) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft sm:p-12">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-primary-500">LearnHub</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-slate-600">{description}</p>
        <div className="mt-8">
          <Link to="/courses" className="inline-flex items-center rounded-xl bg-primary-500 px-5 py-3 font-semibold text-white shadow hover:bg-primary-600">
            Explore courses
          </Link>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<PlaceholderPage title="Learn New Skills. Build Your Future." description="LearnHub is being built step by step with React, Tailwind CSS, Flask, and PostgreSQL." />} />
        <Route path="/courses" element={<PlaceholderPage title="Courses" description="Course discovery and filtering will be added in the next development step." />} />
        <Route path="/categories" element={<PlaceholderPage title="Categories" description="Explore course categories on LearnHub." />} />
        <Route path="/about" element={<PlaceholderPage title="About LearnHub" description="Learn more about our e-learning platform." />} />
        <Route path="/contact" element={<PlaceholderPage title="Contact" description="The contact page is being prepared." />} />
        <Route path="/login" element={<PlaceholderPage title="Login" description="Authentication will be connected to the Flask API soon." />} />
        <Route path="/register" element={<PlaceholderPage title="Register" description="Student registration will be added soon." />} />
      </Route>

      <Route element={<ProtectedRoutes allowedRole="student" />}>
        <Route element={<StudentLayout />}>
          <Route path="/student/dashboard" element={<PlaceholderPage title="Student Dashboard" description="Your dashboard content will appear here." />} />
          <Route path="/student/courses" element={<PlaceholderPage title="My Courses" description="Your enrolled courses will appear here." />} />
          <Route path="/student/progress" element={<PlaceholderPage title="Progress" description="Track your learning journey here." />} />
          <Route path="/student/certificates" element={<PlaceholderPage title="Certificates" description="Your certificates will appear here." />} />
          <Route path="/student/profile" element={<PlaceholderPage title="Profile" description="Update your student profile here." />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoutes allowedRole="admin" />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<PlaceholderPage title="Admin Dashboard" description="Platform analytics and overview will appear here." />} />
          <Route path="/admin/courses" element={<PlaceholderPage title="Manage Courses" description="Course CRUD will be added soon." />} />
          <Route path="/admin/students" element={<PlaceholderPage title="Students" description="Student management will be added soon." />} />
          <Route path="/admin/instructors" element={<PlaceholderPage title="Instructors" description="Instructor management will be added soon." />} />
          <Route path="/admin/categories" element={<PlaceholderPage title="Categories" description="Category CRUD will be added soon." />} />
          <Route path="/admin/settings" element={<PlaceholderPage title="Settings" description="Website settings will be added soon." />} />
        </Route>
      </Route>

      <Route path="*" element={<PlaceholderPage title="Page not found" description="The page you requested does not exist." />} />
    </Routes>
  );
}

export default App;
