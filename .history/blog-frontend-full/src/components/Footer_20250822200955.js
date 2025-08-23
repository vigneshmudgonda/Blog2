import React from "react";
import { Link } from "react-router-dom";
import {
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">
          {/* About Me */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">About Me</h5>
            <p>
              I'm <strong>Vignesh Mudgonda</strong>, a content creator and
              blogger. I share tutorials, tips, and insights on web development
              and my journey as a YouTuber. Stay connected!
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
             
             
              
              <li><Link to="/about" className="text-light text-decoration-none">About</Link></li>
              <li><Link to="/contact" className="text-light text-decoration-none">Contact</Link></li>
              <li><Link to="/Privacy-Policy" className="text-light text-decoration-none">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-light text-decoration-none">Terms & Conditions</Link></li>
              <li><Link to="/disclaimer" className="text-light text-decoration-none">Disclaimer</Link></li>
              <li><Link to="/reviews" className="text-light text-decoration-none">Reviews</Link></li>
              <li><Link to="/youtube" className="text-light text-decoration-none">Videos</Link></li>
            
            </ul>
          </div>

          
          
          {/* Connect With Me */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Connect With Me</h5>
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:vigneshmudgonda@gmail.com"
                className="text-light text-decoration-none"
              >
                vigneshmudgonda@gmail.com
              </a>
              <br />
              <strong>Location:</strong> Solapur City, India
            </p>
            <div className="d-flex gap-3 fs-4">
              <a href="https://www.youtube.com/@UNIQUETECH03" className="text-light"><FaYoutube /></a>
              <a href="https://www.instagram.com/uniquetech17/" className="text-light"><FaInstagram /></a>
              <a href="https://twitter.com" className="text-light"><FaTwitter /></a>
              <a href="https://www.linkedin.com/in/vignesh-mudgonda-b1572423b/com" className="text-light"><FaLinkedin /></a>
              
              <li><Link to="/youtube" className="text-light text-decoration-none">Videos</Link></li>
                 <li><Link to="/youtube" className="text-light text-decoration-none">Videos</Link></li>
            </div>
          </div>
        </div>

        <hr className="border-secondary" />
        <p className="text-center mb-0">
          © 2025 Vignesh Mudgonda | All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
