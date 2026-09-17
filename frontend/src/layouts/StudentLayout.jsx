import { useState } from "react";
import { Outlet } from "react-router-dom";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function getSavedUser() {
  const savedUser = localStorage.getItem("user");

  if (!savedUser) return null;

  try {
    return JSON.parse(savedUser);
  } catch {
    localStorage.removeItem("user");
    return null;
  }
}

function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = getSavedUser();

  return (
    <Layout className="dashboard-layout">
      <Sidebar
        role="student"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="dashboard-content">
        <Topbar user={user} onMenuClick={() => setSidebarOpen(true)} />
        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>
    </Layout>
  );
}

export default StudentLayout;
