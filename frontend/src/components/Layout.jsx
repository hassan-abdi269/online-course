function Layout({ children, className = '' }) {
  return <div className={`min-h-screen ${className}`.trim()}>{children}</div>;
}

export default Layout;
