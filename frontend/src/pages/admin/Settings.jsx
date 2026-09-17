import { useState } from 'react';

const initialForm = {
  name: localStorage.getItem('site_name') || 'LearnHub',
  email: localStorage.getItem('site_email') || 'admin@learnhub.com',
  description: localStorage.getItem('site_description') || 'Learn new skills online',
};

function Settings() {
  const [form, setForm] = useState(initialForm);
  const [saved, setSaved] = useState(false);

  function handleChange(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setSaved(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem('site_name', form.name);
    localStorage.setItem('site_email', form.email);
    localStorage.setItem('site_description', form.description);
    setSaved(true);
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="mt-2 text-slate-500">Manage your LearnHub site settings.</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
        <div className="grid gap-6">
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Site name
            <input name="name" value={form.name} onChange={handleChange} required className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-primary-500" />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Contact email
            <input name="email" type="email" value={form.email} onChange={handleChange} required className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-primary-500" />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Site description
            <textarea name="description" value={form.description} onChange={handleChange} rows="4" className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-primary-500" />
          </label>
        </div>
        <div className="mt-6 flex items-center gap-4">
          <button type="submit" className="rounded-xl bg-primary-500 px-5 py-3 font-semibold text-white transition hover:bg-primary-600">Save settings</button>
          {saved && <p className="text-sm font-medium text-green-600" role="status">Settings saved successfully.</p>}
        </div>
      </form>
    </section>
  );
}

export default Settings;
