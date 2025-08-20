import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar(){
  return (
    <nav className="navbar navbar-expand-lg bg-dark  border-bottom sticky-top">bg-dark text-light pt-5 pb-3 mt-5
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">MY BLOG</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="nav" className="collapse navbar-collapse ">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><NavLink end className="nav-link" to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/blog">Blog</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/reviews">Reviews</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/login">Admin</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
