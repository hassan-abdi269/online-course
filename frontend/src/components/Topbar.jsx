function Topbar({ user, onMenuClick }) {
  const displayName = user?.name || user?.email || "User";

  return (
    <header className="topbar">
      <button className="mobile-menu-button" onClick={onMenuClick} aria-label="Open menu">
        ☰
      </button>

      <div className="topbar-search">
        <span aria-hidden="true">⌕</span>
        <input type="search" placeholder="Search..." aria-label="Search" />
      </div>

      <div className="topbar-actions">
        <button className="notification-button" aria-label="Notifications">♢</button>
        <div className="topbar-user">
          <div className="user-avatar">{displayName.charAt(0).toUpperCase()}</div>
          <div>
            <strong>{displayName}</strong>
            <small>{user?.role === "admin" ? "Administrator" : "Student"}</small>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
