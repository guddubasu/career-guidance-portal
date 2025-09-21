import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/">CareerPortal</Link>
      </div>

      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/careers" onClick={() => setIsOpen(false)}>Careers</Link>
        <Link to="/institutions" onClick={() => setIsOpen(false)}>Institutions</Link>
        <Link to="/scholarships" onClick={() => setIsOpen(false)}>Scholarships</Link>
        <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
        <Link to="/profile" onClick={()=> setIsOpen(false)}>Profile</Link>
      </div>

      <button className="navbar-toggle" onClick={toggleMenu}>
        ☰
      </button>
    </header>
  );
}
