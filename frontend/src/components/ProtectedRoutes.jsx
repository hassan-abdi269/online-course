import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { API_URL } from '../lib/api';

function getCachedUser() {
  try {
    const value = localStorage.getItem('user');
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

function ProtectedRoutes({ allowedRole }) {
  const cachedUser = getCachedUser();
  const [state, setState] = useState({ loading: !cachedUser, user: cachedUser });

  useEffect(() => {
    let mounted = true;

    fetch(`${API_URL}/auth/me`, { credentials: 'include' })
      .then((response) => {
        if (!response.ok) throw new Error('Unauthenticated');
        return response.json();
      })
      .then(({ user }) => {
        if (!mounted) return;
        localStorage.setItem('user', JSON.stringify(user));
        setState({ loading: false, user });
      })
      .catch(() => {
        if (!mounted) return;
        if (cachedUser) {
          setState({ loading: false, user: cachedUser });
        } else {
          setState({ loading: false, user: null });
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (state.loading) {
    return <main className="flex min-h-screen items-center justify-center bg-slate-50 p-8 text-slate-500">Loading dashboard...</main>;
  }

  if (!state.user) return <Navigate to="/login" replace />;

  if (allowedRole && state.user.role !== allowedRole) {
    return <Navigate to={state.user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;
