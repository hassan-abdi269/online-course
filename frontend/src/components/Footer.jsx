import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link to="/" className="text-2xl font-extrabold text-primary-500">Learn<span className="text-white">Hub</span></Link>
          <p className="mt-4 max-w-xs text-sm leading-7">Learn new skills, improve your future, and achieve your goals with LearnHub.</p>
        </div>
        <div>
          <h2 className="font-bold text-white">Quick Links</h2>
          <div className="mt-4 space-y-2 text-sm">
            <Link className="block hover:text-white" to="/">Home</Link>
            <Link className="block hover:text-white" to="/courses">Courses</Link>
            <Link className="block hover:text-white" to="/categories">Categories</Link>
            <Link className="block hover:text-white" to="/about">About Us</Link>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-white">Support</h2>
          <div className="mt-4 space-y-2 text-sm">
            <Link className="block hover:text-white" to="/contact">Contact Us</Link>
            <Link className="block hover:text-white" to="/login">Login</Link>
            <Link className="block hover:text-white" to="/register">Register</Link>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-white">Contact</h2>
          <p className="mt-4 text-sm leading-7">support@learnhub.com<br />+1 234 567 890<br />New York, USA</p>
        </div>
      </div>
      <div className="border-t border-slate-800 px-4 py-5 text-center text-sm">© {new Date().getFullYear()} LearnHub. All rights reserved.</div>
    </footer>
  );
}

export default Footer;
