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
    <aside className={`flex w-64 shrink-0 flex-col border-r border-slate-800 bg-slate-900 text-slate-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
      <div className="flex h-20 items-center justify-between border-b border-slate-800 px-6">
        <button type="button" onClick={() => navigate(role === 'admin' ? '/admin/dashboard' : '/student/dashboard')} className="text-left text-xl font-bold tracking-tight text-white">
          Learn<span className="text-primary-400">Hub</span>
        </button>
        <button type="button" onClick={onClose} className="text-2xl text-slate-400 hover:text-white lg:hidden" aria-label="Close menu">×</button>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-6" aria-label="Dashboard navigation">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          {role === 'admin' ? 'Administration' : 'Learning'}
        </p>
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={onClose}
            className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${isActive ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <span className="flex w-5 justify-center text-lg" aria-hidden="true">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-800 p-3">
        <button type="button" onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-300">
          <span className="flex w-5 justify-center text-lg" aria-hidden="true">↪</span>
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
