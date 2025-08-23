import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar(){
  return (
    <nav className="navbar navbar-expand-lg bg-dark border-bottom sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-light " to="/">Unique Tech</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="nav" className="collapse navbar-collapse ">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><NavLink end className="nav-link text-light " to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link text-light " to="/blog">Blog</NavLink></li>
            
            <li className="nav-item"><NavLink className="nav-link text-light " to="/about">About</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link text-light " to="/contact">Contact</NavLink></li>
                 <li className="nav-item"><NavLink className="nav-link text-light " to="/Privacy-Policy">Privacy Policy</NavLink></li>
                  <li className="nav-item"><NavLink className="nav-link text-light " to="/">Terms & Conditions</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link text-light " to="/reviews">Reviews</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link text-light " to="/login">Admin</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
              <li><Link to="/about" className="text-light text-decoration-none">About</Link></li>
              <li><Link to="/contact" className="text-light text-decoration-none">Contact</Link></li>
              <li><Link to="/Privacy-Policy" className="text-light text-decoration-none">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-light text-decoration-none">Terms & Conditions</Link></li>
              <li><Link to="/disclaimer" className="text-light text-decoration-none">Disclaimer</Link></li>