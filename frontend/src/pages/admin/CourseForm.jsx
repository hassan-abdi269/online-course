import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFetch } from '../../lib/api';

const empty = { title: '', description: '', level: 'Beginner', price: 0, duration: '', category_id: '', instructor_id: '' };

function CourseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [categories, setCategories] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      apiFetch('/categories').then((r) => r.ok ? r.json() : Promise.reject(new Error('Unable to load categories.'))),
      apiFetch('/instructors').then((r) => r.ok ? r.json() : Promise.reject(new Error('Unable to load instructors.'))),
    ]).then(([cats, people]) => {
      setCategories(cats);
      setInstructors(people);
    }).catch((e) => setError(e.message));

    if (id) {
      apiFetch(`/courses/${id}`).then((r) => r.ok ? r.json() : Promise.reject(new Error('Unable to load course.'))).then((course) => setForm({ ...empty, ...course, category_id: course.category?.id || '', instructor_id: course.instructor?.id || '' })).catch((e) => setError(e.message));
    }
  }, [id]);

  function change(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function submit(event) {
    event.preventDefault();
    setError('');
    const response = await apiFetch(id ? `/courses/${id}` : '/courses', {
      method: id ? 'PUT' : 'POST',
      body: JSON.stringify({
        ...form,
        price: Number(form.price) || 0,
        category_id: form.category_id ? Number(form.category_id) : null,
        instructor_id: form.instructor_id ? Number(form.instructor_id) : null,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.message || 'Unable to save course.');
      return;
    }
    navigate('/admin/courses');
  }

  return <section className="max-w-3xl"><h1 className="text-3xl font-extrabold">{id ? 'Edit course' : 'Add course'}</h1>{error && <p className="mt-5 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}<form onSubmit={submit} className="mt-8 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><label className="block text-sm font-semibold">Title<input required name="title" value={form.title} onChange={change} className="mt-2 w-full rounded-xl border p-3" /></label><label className="block text-sm font-semibold">Description<textarea required name="description" value={form.description} onChange={change} rows="5" className="mt-2 w-full rounded-xl border p-3" /></label><div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm font-semibold">Level<select name="level" value={form.level} onChange={change} className="mt-2 w-full rounded-xl border p-3"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label><label className="block text-sm font-semibold">Price<input type="number" min="0" name="price" value={form.price} onChange={change} className="mt-2 w-full rounded-xl border p-3" /></label><label className="block text-sm font-semibold">Duration<input name="duration" value={form.duration} onChange={change} className="mt-2 w-full rounded-xl border p-3" /></label><label className="block text-sm font-semibold">Category<select name="category_id" value={form.category_id} onChange={change} className="mt-2 w-full rounded-xl border p-3"><option value="">Select...</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label className="block text-sm font-semibold">Instructor<select name="instructor_id" value={form.instructor_id} onChange={change} className="mt-2 w-full rounded-xl border p-3"><option value="">Select...</option>{instructors.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label></div><button className="rounded-xl bg-primary-500 px-5 py-3 font-bold text-white">{id ? 'Save changes' : 'Create course'}</button></form></section>;
}
export default CourseForm;
