// src/pages/BlogDetail.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { Helmet } from "react-helmet";
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
      {/* ✅ Helmet SEO Meta Tags */}
      <Helmet>
        <title>{blog.title} | Unique Tech</title>
        <meta
          name="description"
          content={blog.content.replace(/<[^>]+>/g, "").slice(0, 150)}
        />
        <meta property="og:title" content={blog.title} />
        <meta
          property="og:description"
          content={blog.content.replace(/<[^>]+>/g, "").slice(0, 150)}
        />
        <meta
          property="og:image"
          content={blog.image || "https://uniquetech03.netlify.app/default-og.jpg"}
        />
        <meta property="og:type" content="article" />
      </Helmet>

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

      {/* ✅ Blog Content */}
      <div
        className="blog-content"
        style={{
          lineHeight: "1.9",
          fontSize: "1.15rem",
          color: "#333",
          fontFamily: "Georgia, 'Times New Roman', serif",
          textAlign: "justify"
        }}
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>

      {/* ✅ Related Blogs */}
      {related.length > 0 && (
        <div className="mt-5">
          <h4>Related Posts</h4>
          <ul>
            {related.map((r) => (
              <li key={r._id}>
                <Link to={`/blog/${r._id}`}>{r.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ✅ Share Buttons */}
      <div className="mt-4">
        <h5>Share this post:</h5>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
          target="_blank"
          rel="noopener noreferrer"
          className="me-3"
        >
          <FaFacebook size={24} />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${blog.title}`}
          target="_blank"
          rel="noopener noreferrer"
          className="me-3"
        >
          <FaTwitter size={24} />
        </a>
        <a
          href={`https://api.whatsapp.com/send?text=${blog.title} ${window.location.href}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp size={24} />
        </a>
      </div>
    </div>
  );
}
