import { Link, NavLink } from 'react-router-dom';

const links = [
  { label: 'Home', path: '/' },
  { label: 'Courses', path: '/courses' },
  { label: 'Categories', path: '/categories' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-primary-500">
          Learn<span className="text-slate-900">Hub</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? 'text-primary-500' : 'text-slate-600 hover:text-primary-500'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/login" className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-primary-500 hover:bg-primary-50 sm:px-4">
            Login
          </Link>
          <Link to="/register" className="rounded-xl bg-primary-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 sm:px-4">
            Register
          </Link>
        </div>
      </div>

      <nav className="mx-auto flex max-w-7xl gap-5 overflow-x-auto px-4 pb-3 md:hidden sm:px-6" aria-label="Mobile navigation">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => `whitespace-nowrap text-sm font-medium ${isActive ? 'text-primary-500' : 'text-slate-600'}`}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
