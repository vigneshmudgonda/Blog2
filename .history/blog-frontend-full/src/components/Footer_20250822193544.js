// src/components/Footer.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaYoutube, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <Container>
        <Row>
          {/* About */}
          <Col md={4}>
            <h5 className="fw-bold mb-3">About Me</h5>
            <p>
              I'm <strong>Vignesh Mudgonda</strong>, a content creator and
              blogger. I share tutorials, tips, and insights on web development
              and my journey as a YouTuber. Stay connected!
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={4}>
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/videos" className="text-light">Videos</a></li>
              <li><a href="/blog" className="text-light">Blog</a></li>
              <li><a href="/about" className="text-light">About</a></li>
              <li><a href="/contact" className="text-light">Contact</a></li>
              <li><a href="/reviews" className="text-light">Reviews</a></li>
              <li><a href="/privacy-policy" className="text-light">Privacy Policy</a></li>
              <li><a href="/terms" className="text-light">Terms & Conditions</a></li>
            </ul>
          </Col>

          {/* Contact + Social */}
          <Col md={4}>
            <h5 className="fw-bold mb-3">Connect With Me</h5>
            <p><strong>Email:</strong> vigneshmudgonda@gmail.com</p>
            <p><strong>Location:</strong> Solapur City, India</p>
            <div className="d-flex gap-3">
              <a href="https://youtube.com" className="text-light"><FaYoutube size={24} /></a>
              <a href="https://instagram.com" className="text-light"><FaInstagram size={24} /></a>
              <a href="https://twitter.com" className="text-light"><FaTwitter size={24} /></a>
              <a href="https://linkedin.com" className="text-light"><FaLinkedin size={24} /></a>
            </div>
          </Col>
        </Row>

        <hr className="border-secondary my-4" />

        <Row>
          <Col className="text-center">
            <p className="mb-0">
              © {new Date().getFullYear()} Vignesh Mudgonda | All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
