import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [enrollments, setEnrollments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user?.id) return;
    fetch(`${API_URL}/enrollments?student_id=${user.id}`)
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load your courses.');
        return response.json();
      })
      .then(setEnrollments)
      .catch((requestError) => setError(requestError.message));
  }, [user?.id]);

  const completed = enrollments.filter((item) => item.progress === 100).length;
  const inProgress = enrollments.filter((item) => item.progress < 100).length;

  return <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="rounded-3xl bg-gradient-to-r from-primary-600 to-blue-500 p-8 text-white shadow-soft">
      <p className="text-blue-100">Welcome back</p><h1 className="mt-2 text-3xl font-extrabold">{user?.name || 'Student'} 👋</h1><p className="mt-3 text-blue-100">Continue learning and reach your goals.</p>
    </div>
    <div className="mt-6 grid gap-4 sm:grid-cols-3"><Stat label="Enrolled courses" value={enrollments.length} /><Stat label="In progress" value={inProgress} /><Stat label="Completed" value={completed} /></div>
    <section className="mt-10"><div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-slate-900">Continue learning</h2><Link to="/student/courses" className="font-semibold text-primary-500">View all</Link></div>{error && <p className="mt-4 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}{enrollments.length === 0 && !error && <p className="mt-5 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">You have not enrolled in a course yet.</p>}<div className="mt-5 grid gap-5 md:grid-cols-2">{enrollments.slice(0, 2).map((item) => <EnrollmentCard key={item.id} enrollment={item} />)}</div></section>
  </main>;
}
function Stat({ label, value }) { return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-extrabold text-slate-900">{value}</p></div>; }
function EnrollmentCard({ enrollment }) { return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between gap-4"><div><h3 className="font-bold text-slate-900">{enrollment.course?.title}</h3><p className="mt-1 text-sm text-slate-500">{enrollment.progress}% complete</p></div><Link to={`/student/learning/${enrollment.course_id}`} className="rounded-lg bg-primary-500 px-3 py-2 text-sm font-semibold text-white">Continue</Link></div><div className="mt-4 h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-primary-500" style={{ width: `${enrollment.progress}%` }} /></div></article>; }
export default Dashboard;
