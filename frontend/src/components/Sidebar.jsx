import { NavLink, useNavigate } from "react-router-dom";

const studentLinks = [
  { label: "Dashboard", path: "/student/dashboard", icon: "▦" },
  { label: "My Courses", path: "/student/courses", icon: "▣" },
  { label: "Progress", path: "/student/progress", icon: "◔" },
  { label: "Certificates", path: "/student/certificates", icon: "▤" },
  { label: "Profile", path: "/student/profile", icon: "◉" },
];

const adminLinks = [
  { label: "Dashboard", path: "/admin/dashboard", icon: "▦" },
  { label: "Courses", path: "/admin/courses", icon: "▣" },
  { label: "Students", path: "/admin/students", icon: "◉" },
  { label: "Instructors", path: "/admin/instructors", icon: "♙" },
  { label: "Categories", path: "/admin/categories", icon: "▤" },
  { label: "Settings", path: "/admin/settings", icon: "⚙" },
];

function Sidebar({ role = "student", isOpen = false, onClose = () => {} }) {
  const navigate = useNavigate();
  const links = role === "admin" ? adminLinks : studentLinks;

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <>
      {isOpen && <button className="sidebar-overlay" onClick={onClose} aria-label="Close sidebar" />}

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <NavLink to="/" className="logo" onClick={onClose}>
            Learn<span>Hub</span>
          </NavLink>
          <button className="sidebar-close" onClick={onClose} aria-label="Close sidebar">×</button>
        </div>

        <p className="sidebar-title">{role === "admin" ? "Admin Panel" : "Student Panel"}</p>

        <nav className="sidebar-links" aria-label={`${role} navigation`}>
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={onClose}
              className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
            >
              <span className="sidebar-icon">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button className="sidebar-link logout-link" onClick={handleLogout}>
          <span className="sidebar-icon">↪</span>
          Logout
        </button>
      </aside>
    </>
  );
}

export default Sidebar;
