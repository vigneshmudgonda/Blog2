// src/pages/BlogDetail.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import api from "../services/api";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/api/blogs/${id}`);
        setBlog(res.data);

        if (res.data.category) {
          const rel = await api.get(
            `/api/blogs?q=&category=${res.data.category}&limit=3`
          );
          setRelated(rel.data.blogs.filter((b) => b._id !== res.data._id));
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <div className="container py-5 text-center">Loading...</div>;

  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="hero-banner text-white rounded mb-4 d-flex align-items-center justify-content-center shadow-sm">
        <div className="text-center px-3">
          <h1 className="fw-bold display-5">{blog.title}</h1>
          <p className="text-light small mt-3">
            📅 {new Date(blog.createdAt || Date.now()).toLocaleDateString()} | 🏷️{" "}
            <span className="badge bg-primary">{blog.category}</span>
          </p>
        </div>
      </div>

      <div className="row">
        {/* Main Blog Content */}
        <div className="col-lg-8">
          <article
            className="p-4 rounded shadow-sm bg-white mb-5 animate-fade"
            style={{ lineHeight: "1.9" }}
          >
            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="img-fluid rounded shadow-sm mb-4"
              />
            )}

            {/* Blog Content */}
            <div
              className="blog-content"
              style={{
                fontSize: "1.15rem",
                color: "#333",
                fontFamily: "'Merriweather', Georgia, serif",
                textAlign: "justify"
              }}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            ></div>

            {/* Tags */}
            {blog.tags?.length > 0 && (
              <div className="mt-4">
                {blog.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="badge bg-secondary me-2 px-3 py-2"
                    style={{ fontSize: "0.9rem" }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Social Share */}
            <div className="mt-5 border-top pt-4">
              <h6 className="fw-bold mb-3">📢 Share this post</h6>
              <div className="d-flex gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${blog.title}&url=${window.location.href}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-twitter"
                >
                  <FaTwitter /> Twitter
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-facebook"
                >
                  <FaFacebook /> Facebook
                </a>
                <a
                  href={`https://wa.me/?text=${blog.title} - ${window.location.href}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-whatsapp"
                >
                  <FaWhatsapp /> WhatsApp
                </a>
              </div>
            </div>
          </article>

          {/* Related Posts */}
          {related.length > 0 && (
            <div className="mt-5">
              <h4 className="fw-bold mb-3">📰 Related Posts</h4>
              <div className="row">
                {related.map((r) => (
                  <div key={r._id} className="col-md-4 mb-3">
                    <div className="card h-100 shadow-sm border-0 hover-shadow animate-fade">
                      {r.image && (
                        <img
                          src={r.image}
                          alt={r.title}
                          className="card-img-top"
                          style={{ height: "150px", objectFit: "cover" }}
                        />
                      )}
                      <div className="card-body">
                        <h6 className="card-title fw-bold">{r.title}</h6>
                        <Link
                          to={`/blog/${r._id}`}
                          className="btn btn-sm btn-outline-primary"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="col-lg-4">
          <div className="card shadow-sm mb-4 border-0 text-center p-3">
            <img
              src="https://via.placeholder.com/100"
              alt="Author "
              className="rounded-circle mx-auto mb-3"
              width="80"
              height="80"
            />
            <h5 className="fw-bold mb-1">👨‍💻 Admin</h5>
            <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
              Passionate blogger sharing insights on web development, coding, and
              tech trends.
            </p>
          </div>

          <div className="card shadow-sm border-0 p-3">
            <h5 className="fw-bold mb-3">📂 Categories</h5>
            <div className="d-flex flex-wrap gap-2">
              <Link to="/?category=Tech" className="badge bg-light text-dark">
                Tech
              </Link>
              <Link to="/?category=News" className="badge bg-light text-dark">
                News
              </Link>
              <Link to="/?category=Education" className="badge bg-light text-dark">
                Education
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* ✅ Extra CSS for Pro Styling */}
      <style>
        {`
          .hero-banner {
            background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), 
                        url(${blog.image || "https://via.placeholder.com/1200x400"}) center/cover;
            min-height: 280px;
          }
          .blog-content h2, .blog-content h3 {
            margin-top: 1.5rem;
            font-weight: bold;
          }
          .blog-content p {
            margin-bottom: 1rem;
          }
          .blog-content blockquote {
            background: #f8f9fa;
            padding: 1rem;
            border-left: 4px solid #0d6efd;
            font-style: italic;
            margin: 1.5rem 0;
          }
          .blog-content pre {
            background: #272822;
            color: #f8f8f2;
            padding: 1rem;
            border-radius: 5px;
            overflow-x: auto;
          }
          .hover-shadow:hover {
            transform: translateY(-4px);
            box-shadow: 0 6px 16px rgba(0,0,0,0.15);
            transition: 0.3s ease;
          }
          .btn-twitter {
            background: #1da1f2;
            color: white;
          }
          .btn-facebook {
            background: #3b5998;
            color: white;
          }
          .btn-whatsapp {
            background: #25d366;
            color: white;
          }
          .btn-twitter:hover,
          .btn-facebook:hover,
          .btn-whatsapp:hover {
            opacity: 0.85;
          }
          .animate-fade {
            animation: fadeIn 0.6s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}
