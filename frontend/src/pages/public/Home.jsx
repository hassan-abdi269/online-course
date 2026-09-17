import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary-50 via-white to-blue-100">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-primary-500">Learn without limits</p>
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-6xl">Learn New Skills.<br /><span className="text-primary-500">Build Your Future.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">Learn from professional instructors and improve your skills through high-quality online courses.</p>
            <Link to="/courses" className="mt-8 inline-flex rounded-xl bg-primary-500 px-6 py-3 font-bold text-white shadow-lg shadow-primary-500/20 hover:bg-primary-600">Explore Courses</Link>
          </div>
          <div className="rounded-3xl bg-primary-500 p-8 text-white shadow-soft sm:p-12">
            <div className="rounded-2xl bg-white/15 p-6"><span className="text-6xl">📚</span><p className="mt-8 text-3xl font-bold">Grow your skills, one lesson at a time.</p><p className="mt-4 text-blue-100">Flexible learning designed for your goals.</p></div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-wider text-primary-500">Start learning</p><h2 className="mt-2 text-3xl font-bold text-slate-900">Popular learning categories</h2></div><Link to="/categories" className="font-semibold text-primary-500">View all</Link></div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{['Web Development', 'Programming', 'Design', 'Business'].map((category) => <Link key={category} to={`/courses?category=${encodeURIComponent(category)}`} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary-200 hover:shadow-soft"><span className="text-3xl">{category === 'Design' ? '🎨' : category === 'Business' ? '💼' : category === 'Programming' ? '💻' : '🌐'}</span><h3 className="mt-5 font-bold text-slate-900">{category}</h3><p className="mt-2 text-sm text-slate-500">Build practical skills</p></Link>)}</div>
      </section>
    </div>
  );
}
export default Home;
