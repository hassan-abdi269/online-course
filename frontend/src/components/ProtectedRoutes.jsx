import { Navigate, Outlet } from 'react-router-dom';

function getSavedUser() {
  const savedUser = localStorage.getItem('user');
  if (!savedUser) return null;
  try {
    return JSON.parse(savedUser);
  } catch {
    localStorage.removeItem('user');
    return null;
  }
}

function ProtectedRoutes({ allowedRole }) {
  const user = getSavedUser();
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'} replace />;
  }
  return <Outlet />;
}

export default ProtectedRoutes;
