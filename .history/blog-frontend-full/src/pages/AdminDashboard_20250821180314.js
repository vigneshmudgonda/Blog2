// src/pages/AdminDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    image: "",
    category: "",
    tags: "",
  });
  const [preview, setPreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);



  const navigate = useNavigate();

  // ✅ ReactQuill toolbar configuration
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"], // ✅ image button
      ["clean"],
    ],
  };

  // Fetch Blogs
  const fetchBlogs = async () => {
    const { data } = await axios.get(`${API_URL}/api/blogs`);
    setBlogs(data.blogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "image") {
      setPreview(e.target.value); // live preview for URL
    }
  };

  // Handle Rich Text Change
  const handleContentChange = (value) => {
    setForm({ ...form, content: value });
  };

  // Submit Blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${API_URL}/api/blogs/${editingId}`, {
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()),
      });
    } else {
      await axios.post(`${API_URL}/api/blogs`, {
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()),
      });
    }

    setForm({ title: "", content: "", image: "", category: "", tags: "" });
    setPreview(null);
    setEditingId(null);
    fetchBlogs();
  };

  // Delete Blog
  const deleteBlog = async (id) => {
    await axios.delete(`${API_URL}/api/blogs/${id}`);
    fetchBlogs();
  };

  // Edit Blog
  const editBlog = (blog) => {
    setForm({
      title: blog.title,
      content: blog.content,
      image: blog.image,
      category: blog.category,
      tags: blog.tags?.join(", ") || "",
    });
    setPreview(blog.image);
    setEditingId(blog._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cancel Edit
  const cancelEdit = () => {
    setForm({ title: "", content: "", image: "", category: "", tags: "" });
    setPreview(null);
    setEditingId(null);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container my-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">🛠️ Admin Dashboard</h2>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Blog Form */}
      <div className="card shadow p-4 mb-5 border-0">
        <h4 className="mb-3">
          {editingId ? "✏️ Edit Blog Post" : "✍️ Create New Blog"}
        </h4>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Title</label>
            <input
              className="form-control"
              placeholder="Enter blog title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
        {/* Content Editor with Maximize/Minimize */}
  <div className="container mt-3">
      {/* Label + Toggle button */}
      <div className="mb-2 d-flex justify-content-between align-items-center">
        <label className="form-label fw-semibold mb-0">Content</label>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={() => setIsFullscreen((prev) => !prev)} // ✅ toggle state
        >
          {isFullscreen ? "🗗 Minimize" : "🗖 Maximize"}
        </button>
      </div>

      {/* Editor wrapper */}
      <div
        style={{
          position: isFullscreen ? "fixed" : "relative",
          top: isFullscreen ? 0 : "auto",
          left: isFullscreen ? 0 : "auto",
          width: isFullscreen ? "100vw" : "100%",
          height: isFullscreen ? "100vh" : "400px",
          zIndex: isFullscreen ? 9999 : "auto",
          background: "#fff",
          padding: isFullscreen ? "20px" : "0",
        }}
      >
        <ReactQuill
          value={form.content}
          onChange={handleContentChange}
          modules={quillModules}
          placeholder="Write your blog content here..."
          style={{ height: isFullscreen ? "90vh" : "100%" }}
        />
      </div>
    </div>
  


          {/* Image Upload + Category + Tags */}
          <div className="row">
            {/* ✅ Image Upload */}
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Image</label>
              {/* URL Input */}
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Paste image URL"
                name="image"
                value={form.image}
                onChange={handleChange}
              />
              <div className="text-center mb-2">or</div>
              {/* File Upload */}
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const formData = new FormData();
                  formData.append("image", file);

                  try {
                    const res = await axios.post(`${API_URL}/api/upload`, formData, {
                      headers: { "Content-Type": "multipart/form-data" },
                    });
                    setForm({ ...form, image: res.data.url });
                    setPreview(res.data.url);
                  } catch (err) {
                    console.error("Upload failed", err);
                  }
                }}
              />
              {/* Preview */}
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="img-fluid mt-2 rounded shadow-sm"
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
              )}
            </div>

            {/* Category */}
            <div className="col-md-3 mb-3">
              <label className="form-label fw-semibold">Category</label>
              <input
                className="form-control"
                placeholder="e.g. Tech"
                name="category"
                value={form.category}
                onChange={handleChange}
              />
            </div>

            {/* Tags */}
            <div className="col-md-3 mb-3">
              <label className="form-label fw-semibold">Tags</label>
              <input
                className="form-control"
                placeholder="comma separated"
                name="tags"
                value={form.tags}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="d-flex gap-2">
            <button className="btn btn-primary flex-grow-1 fw-bold">
              {editingId ? "💾 Update Blog" : "🚀 Publish Blog"}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={cancelEdit}
              >
                ❌ Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Blog List */}
      <div className="card shadow p-4 border-0">
        <h4 className="mb-3">📚 All Blogs</h4>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Thumbnail</th>
                <th>Title</th>
                <th>Category</th>
                <th>Tags</th>
                <th>Date</th>
                <th style={{ width: "160px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id}>
                  <td>
                    {blog.image ? (
                      <img
                        src={blog.image}
                        alt={blog.title}
                        style={{
                          width: "70px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                        className="rounded"
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="fw-semibold">{blog.title}</td>
                  <td>{blog.category}</td>
                  <td>
                    {blog.tags?.map((tag, idx) => (
                      <span
                        key={idx}
                        className="badge bg-light text-dark me-1"
                      >
                        #{tag}
                      </span>
                    ))}
                  </td>
                  <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => editBlog(blog)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteBlog(blog._id)}
                    >
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Extra CSS to make editor larger */}
      <style>{`
        .content-editor .ql-editor {
          min-height: 300px;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
}
