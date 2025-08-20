import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer(){
  return (
    <footer className="bg-white border-top mt-5">
      <div className="container py-4">
        <div className="row">
          <div className="col-md-6">
            <h5 className="fw-bold">MY BLOG</h5>
            <p className="text-muted">Sharing my thoughts, experiences, and insights.</p>
          </div>
          <div className="col-md-3">
            <h6 className="fw-semibold">Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/reviews">Reviews</Link></li>
              <li><Link to="/login">Admin</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h6 className="fw-semibold">Follow</h6>
            <a className="btn btn-outline-primary btn-sm" href={process.env.REACT_APP_YOUTUBE_URL || '#'} target="_blank" rel="noreferrer">YouTube</a>
          </div>
        </div>
        <div className="text-muted small mt-3">© {new Date().getFullYear()} My Blog</div>
      </div>
    </footer>
  );
}
