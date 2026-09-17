import { NavLink, useNavigate } from 'react-router-dom';
import { apiFetch } from '../lib/api';

const studentLinks = [
  { label: 'Dashboard', path: '/student/dashboard', icon: '▦' },
  { label: 'My Courses', path: '/student/courses', icon: '▣' },
  { label: 'Progress', path: '/student/progress', icon: '◔' },
  { label: 'Certificates', path: '/student/certificates', icon: '◇' },
  { label: 'Profile', path: '/student/profile', icon: '◎' },
];

const adminLinks = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: '▦' },
  { label: 'Courses', path: '/admin/courses', icon: '▣' },
  { label: 'Students', path: '/admin/students', icon: '♙' },
  { label: 'Instructors', path: '/admin/instructors', icon: '♟' },
  { label: 'Categories', path: '/admin/categories', icon: '◇' },
  { label: 'Settings', path: '/admin/settings', icon: '⚙' },
];

function Sidebar({ role = 'student', isOpen = false, onClose = () => {} }) {
  const navigate = useNavigate();
  const links = role === 'admin' ? adminLinks : studentLinks;

  async function handleLogout() {
    await apiFetch('/auth/logout', { method: 'POST' });
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-header">
        <button type="button" className="sidebar-brand" onClick={() => navigate(role === 'admin' ? '/admin/dashboard' : '/student/dashboard')}>
          LearnHub
        </button>
        <button type="button" className="sidebar-close" onClick={onClose} aria-label="Close menu">×</button>
      </div>

      <nav className="sidebar-nav" aria-label="Dashboard navigation">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={onClose}
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            <span className="sidebar-icon" aria-hidden="true">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <button type="button" className="sidebar-logout" onClick={handleLogout}>
        <span aria-hidden="true">↪</span>
        <span>Log out</span>
      </button>
    </aside>
  );
}

export default Sidebar;
