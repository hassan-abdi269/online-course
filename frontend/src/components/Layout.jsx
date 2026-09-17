function Layout({ children, className = "" }) {
  return <div className={`page-layout ${className}`.trim()}>{children}</div>;
}

export default Layout;
