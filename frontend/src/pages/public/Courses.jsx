import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function CourseCard({ course }) {
  return <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft"><div className="flex h-40 items-center justify-center bg-gradient-to-br from-primary-100 to-blue-200 text-5xl">📘</div><div className="p-5"><div className="flex items-center justify-between gap-2"><span className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-600">{course.category?.name || 'General'}</span><span className="text-sm font-bold text-amber-500">★ {course.rating || 'New'}</span></div><h2 className="mt-4 line-clamp-2 min-h-14 text-lg font-bold text-slate-900">{course.title}</h2><p className="mt-2 text-sm text-slate-500">{course.instructor?.name || 'LearnHub Instructor'}</p><div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4"><span className="font-bold text-slate-900">{Number(course.price) === 0 ? 'Free' : `$${course.price}`}</span><Link to={`/courses/${course.id}`} className="font-semibold text-primary-500 hover:text-primary-700">View course →</Link></div></div></article>;
}

function Courses() {
  const [params, setParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const search = params.get('search') || '';
  const category = params.get('category') || '';
  const level = params.get('level') || '';

  useEffect(() => {
    async function loadCourses() {
      setLoading(true); setError('');
      try {
        const query = new URLSearchParams({ ...(search && { search }), ...(category && { category }), ...(level && { level }) });
        const response = await fetch(`${API_URL}/courses?${query}`);
        if (!response.ok) throw new Error('Unable to load courses.');
        setCourses(await response.json());
      } catch (requestError) { setError(requestError.message); } finally { setLoading(false); }
    }
    loadCourses();
  }, [search, category, level]);

  useEffect(() => { fetch(`${API_URL}/categories`).then((response) => response.ok ? response.json() : []).then(setCategories).catch(() => setCategories([])); }, []);
  const levels = useMemo(() => ['Beginner', 'Intermediate', 'Advanced'], []);
  function updateFilter(key, value) { const next = new URLSearchParams(params); if (value) next.set(key, value); else next.delete(key); setParams(next); }

  return <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-wider text-primary-500">LearnHub library</p><h1 className="mt-2 text-4xl font-extrabold text-slate-900">Explore our courses</h1><p className="mt-4 text-slate-600">Find practical courses taught by instructors who want to help you grow.</p></div><div className="mt-8 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-4"><input value={search} onChange={(event) => updateFilter('search', event.target.value)} placeholder="Search courses..." className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-primary-500" /><select value={category} onChange={(event) => updateFilter('category', event.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-primary-500"><option value="">All categories</option>{categories.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}</select><select value={level} onChange={(event) => updateFilter('level', event.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-primary-500"><option value="">All levels</option>{levels.map((item) => <option key={item}>{item}</option>)}</select><button onClick={() => { setParams({}); }} className="rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-600 hover:bg-slate-50">Clear filters</button></div>{loading && <p className="py-16 text-center text-slate-500">Loading courses...</p>}{error && <p className="mt-8 rounded-xl bg-red-50 p-4 text-red-700">{error} Make sure the Flask API is running.</p>}{!loading && !error && courses.length === 0 && <p className="py-16 text-center text-slate-500">No courses match your search.</p>}{!loading && !error && courses.length > 0 && <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{courses.map((course) => <CourseCard key={course.id} course={course} />)}</div>}</main>;
}
export default Courses;
