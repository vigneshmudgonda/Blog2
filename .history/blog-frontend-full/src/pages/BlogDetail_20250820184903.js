// src/pages/BlogDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/api/blogs/${id}`);
        setBlog(res.data);
      } catch (e) {
        console.error(e);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await api.get(`/api/comments/${id}`);
        setComments(res.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchBlog();
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await api.post(`/api/comments`, {
        blogId: id,
        name: "Anonymous", // can be replaced with logged-in user
        content: newComment,
      });
      setComments([res.data, ...comments]);
      setNewComment("");
    } catch (e) {
      console.error(e);
    }
  };

  if (!blog) return <div className="container py-4">Loading...</div>;

  return (
    <div className="container py-5">
      {/* Blog Header */}
      <div className="mb-4">
        <h1 className="fw-bold mb-2">{blog.title}</h1>
        <p className="text-muted">
          📅 {new Date(blog.createdAt || Date.now()).toLocaleDateString()} | 🏷️{" "}
          {blog.category}
        </p>
        {blog.tags?.length > 0 && (
          <div className="mb-2">
            {blog.tags.map((tag, idx) => (
              <span
                key={idx}
                className="badge bg-secondary me-2"
                style={{ fontSize: "0.85rem" }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Blog Image */}
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="img-fluid rounded shadow mb-4"
          style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
        />
      )}

      {/* Blog Content */}
      <div className="mb-5" style={{ lineHeight: "1.8", fontSize: "1.1rem" }}>
        {blog.content}
      </div>

      {/* Share Buttons */}
      <div className="mb-5">
        <h5>🔗 Share this post:</h5>
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

      {/* Comments Section */}
      <div className="card shadow-sm p-4">
        <h5 className="fw-bold mb-3">💬 Comments</h5>

        {/* Add Comment */}
        <form onSubmit={handleCommentSubmit} className="mb-4">
          <textarea
            className="form-control mb-2"
            rows="3"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button className="btn btn-primary">Post Comment</button>
        </form>

        {/* Show Comments */}
        {comments.length > 0 ? (
          <ul className="list-group">
            {comments.map((c) => (
              <li
                key={c._id}
                className="list-group-item border-0 border-bottom py-3"
              >
                <strong>{c.name}</strong>
                <p className="mb-1">{c.content}</p>
                <small className="text-muted">
                  {new Date(c.date).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No comments yet. Be the first!</p>
        )}
      </div>
    </div>
  );
}
