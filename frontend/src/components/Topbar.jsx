function Topbar({ user, onMenuClick }) {
  const displayName = user?.name || user?.email || 'User';

  return (
    <header className="flex min-h-20 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      <button className="text-2xl text-slate-600 lg:hidden" onClick={onMenuClick} aria-label="Open menu">☰</button>
      <div className="flex max-w-md flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-400">
        <span aria-hidden="true">⌕</span><input className="w-full bg-transparent text-sm text-slate-800 outline-none" type="search" placeholder="Search..." aria-label="Search" />
      </div>
      <div className="flex items-center gap-3 sm:gap-5">
        <button className="text-xl text-slate-500" aria-label="Notifications">♢</button>
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 font-bold text-primary-500">{displayName.charAt(0).toUpperCase()}</div>
          <div className="hidden sm:block"><strong className="block text-sm text-slate-800">{displayName}</strong><small className="text-xs text-slate-400">{user?.role === 'admin' ? 'Administrator' : 'Student'}</small></div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
