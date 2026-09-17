import { useEffect, useState } from 'react';
import { apiFetch } from '../../lib/api';
function Instructors() { const [items, setItems] = useState([]); useEffect(() => { apiFetch('/instructors').then((r) => r.json()).then(setItems); }, []); return <section><h1 className="text-3xl font-extrabold">Instructors</h1><div className="mt-8 grid gap-4 md:grid-cols-2">{items.map((item) => <article key={item.id} className="rounded-2xl border bg-white p-5"><h2 className="font-bold">{item.name}</h2><p className="mt-1 text-sm text-slate-500">{item.email}</p><p className="mt-4 text-sm">{item.specialization || 'General instructor'} · {item.courses_count} courses</p></article>)}</div></section>; }
export default Instructors;
