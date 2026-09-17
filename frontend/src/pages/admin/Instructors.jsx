import { useEffect, useState } from 'react';
import { apiFetch } from '../../lib/api';

const emptyForm = { name: '', email: '', specialization: '', rating: '0' };

function Instructors() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    apiFetch('/instructors')
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('Unable to load instructors')))
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function editInstructor(instructor) {
    setEditingId(instructor.id);
    setForm({
      name: instructor.name || '',
      email: instructor.email || '',
      specialization: instructor.specialization || '',
      rating: String(instructor.rating ?? 0),
    });
    setError('');
    setMessage('');
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function submit(event) {
    event.preventDefault();
    setError('');
    setMessage('');
    const response = await apiFetch(editingId ? `/instructors/${editingId}` : '/instructors', {
      method: editingId ? 'PATCH' : 'POST',
      body: JSON.stringify(form),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setError(data.message || 'Unable to save instructor');
      return;
    }
    setMessage(data.message);
    resetForm();
    load();
  }

  async function removeInstructor(id) {
    if (!window.confirm('Delete this instructor?')) return;
    setError('');
    const response = await apiFetch(`/instructors/${id}`, { method: 'DELETE' });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setError(data.message || 'Unable to delete instructor');
      return;
    }
    setMessage(data.message);
    load();
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Instructors</h1>
        <p className="mt-2 text-slate-500">Add, edit, and remove course instructors.</p>
      </div>

      <form onSubmit={submit} className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">{editingId ? 'Edit instructor' : 'Add instructor'}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <input name="name" value={form.name} onChange={updateField} placeholder="Full name" required className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500" />
          <input name="email" type="email" value={form.email} onChange={updateField} placeholder="Email address" required className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500" />
          <input name="specialization" value={form.specialization} onChange={updateField} placeholder="Specialization" className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500" />
          <input name="rating" type="number" min="0" max="5" step="0.1" value={form.rating} onChange={updateField} placeholder="Rating" className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500" />
        </div>
        <div className="mt-4 flex gap-3">
          <button type="submit" className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">{editingId ? 'Save changes' : 'Add instructor'}</button>
          {editingId && <button type="button" onClick={resetForm} className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700">Cancel</button>}
        </div>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
      </form>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
        {loading ? <p className="p-6 text-slate-500">Loading instructors...</p> : items.length === 0 ? <p className="p-6 text-slate-500">No instructors yet. Add the first instructor above.</p> : (
          <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-slate-500"><tr><th className="px-6 py-4">Name</th><th className="px-6 py-4">Email</th><th className="px-6 py-4">Specialization</th><th className="px-6 py-4">Rating</th><th className="px-6 py-4">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{items.map((instructor) => <tr key={instructor.id}><td className="px-6 py-4 font-semibold text-slate-900">{instructor.name}</td><td className="px-6 py-4 text-slate-600">{instructor.email}</td><td className="px-6 py-4 text-slate-600">{instructor.specialization || '—'}</td><td className="px-6 py-4 text-slate-600">{instructor.rating ?? 0}</td><td className="px-6 py-4"><div className="flex gap-2"><button onClick={() => editInstructor(instructor)} className="rounded-lg border border-slate-300 px-3 py-2 text-slate-700 hover:bg-slate-50">Edit</button><button onClick={() => removeInstructor(instructor.id)} className="rounded-lg bg-red-50 px-3 py-2 text-red-600 hover:bg-red-100">Delete</button></div></td></tr>)}</tbody></table></div>
        )}
      </div>
    </section>
  );
}

export default Instructors;
