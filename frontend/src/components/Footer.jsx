import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="logo footer-logo">
            Learn<span>Hub</span>
          </Link>
          <p>Learn new skills, improve your future, and achieve your goals with LearnHub.</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/about">About Us</Link>
        </div>

        <div>
          <h3>Support</h3>
          <Link to="/contact">Contact Us</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

        <div>
          <h3>Contact</h3>
          <p>Email: support@learnhub.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>New York, USA</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} LearnHub. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
