import { Navigate, Outlet, useEffect, useState } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function ProtectedRoutes({ allowedRole }) {
  const [state, setState] = useState({ loading: true, user: null });
  useEffect(() => {
    fetch(`${API_URL}/auth/me`, { credentials: 'include' })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('Unauthenticated')))
      .then(({ user }) => setState({ loading: false, user }))
      .catch(() => setState({ loading: false, user: null }));
  }, []);
  if (state.loading) return <main className="p-8 text-slate-500">Checking session...</main>;
  if (!state.user) return <Navigate to="/login" replace />;
  if (allowedRole && state.user.role !== allowedRole) return <Navigate to={state.user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'} replace />;
  return <Outlet />;
}
export default ProtectedRoutes;
