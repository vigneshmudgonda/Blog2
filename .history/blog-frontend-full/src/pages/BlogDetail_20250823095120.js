// src/pages/BlogDetail.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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

  // ✅ Estimate reading time
  const words = blog.content?.replace(/<[^>]+>/g, "").split(/\s+/).length || 0;
  const readingTime = Math.ceil(words / 200); // avg 200 WPM

  return (
    <div className="container py-5">
      <div className="row">
        {/* Main Blog Content */}
        <div className="col-lg-8">
          <article className="mb-5">
            <h1 className="fw-bold mb-3 display-5">{blog.title}</h1>
            <p className="text-muted small mb-4">
              📅 {new Date(blog.createdAt || Date.now()).toLocaleDateString()} | 🏷️ {blog.category} | ⏱ {readingTime} min read
            </p>

            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="img-fluid rounded shadow-sm mb-4"
              />
            )}

            {/* ✅ Render blog content as HTML */}
            <div
              className="blog-content"
              style={{
                lineHeight: "1.9",
                fontSize: "1.15rem",
                color: "#2c2c2c",
                fontFamily: "Georgia, 'Times New Roman', serif",
                textAlign: "justify"
              }}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            ></div>

            {/* Tags */}
            {blog.tags?.length > 0 && (
              <div className="mt-4">
                <h6 className="fw-bold">🏷 Tags:</h6>
                {blog.tags.map((tag, idx) => (
                  <span key={idx} className="badge bg-light text-dark me-2">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Social Share */}
            <div className="mt-4 border-top pt-3">
              <h6 className="fw-bold mb-2">📢 Share this post:</h6>
              <a
                href={`https://twitter.com/intent/tweet?text=${blog.title}&url=${window.location.href}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-outline-primary me-2"
              >
                Twitter
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-outline-primary me-2"
              >
                Facebook
              </a>
              <a
                href={`https://wa.me/?text=${blog.title} - ${window.location.href}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-outline-success"
              >
                WhatsApp
              </a>
            </div>
          </article>

          {/* Related Posts */}
          {related.length > 0 && (
            <div className="mt-5">
              <h4 className="fw-bold mb-3">📰 Related Posts</h4>
              <div className="row">
                {related.map((r) => (
                  <div key={r._id} className="col-md-4 mb-3">
                    <div className="card h-100 shadow-sm border-0">
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
          <div className="card shadow-sm mb-4 border-0">
            <div className="card-body">
              <h5 className="fw-bold">👨‍💻 About Author</h5>
              <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>
                Written by <b>Admin</b> <br />
                Passionate blogger sharing insights on web development, coding,
                and tech trends.
              </p>
            </div>
          </div>

          {/* Categories */}
          <div className="card shadow-sm mb-4 border-0">
            <div className="card-body">
              <h5 className="fw-bold">📂 Categories</h5>
              <ul className="list-unstyled mb-0">
                <li><Link to="/?category=Tech" className="text-decoration-none">💻 Tech</Link></li>
                <li><Link to="/?category=News" className="text-decoration-none">📰 News</Link></li>
                <li><Link to="/?category=Education" className="text-decoration-none">🎓 Education</Link></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="fw-bold">📧 Stay Updated</h5>
              <p className="small text-muted">Subscribe to get the latest posts directly in your inbox.</p>
              <input
                type="email"
                className="form-control mb-2"
                placeholder="Enter your email"
              />
              <button className="btn btn-primary w-100">Subscribe</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
