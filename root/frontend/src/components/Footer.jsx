import React from "react";
import { Link } from "react-router-dom";
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo / Site Name */}
        <div className="footer-logo">
          <h2>CareerCompass</h2>
        </div>

        {/* Navigation Links */}
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/institutions">Institutions</Link>
          <Link to="/scholarships">Scholarships</Link>
          <Link to="/ai-chat">AI Chat</Link>
        </div>

        {/* Social / Optional */}
        <div className="footer-social">
          <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CareerCompass. All rights reserved.</p>
      </div>
    </footer>
  );
}
