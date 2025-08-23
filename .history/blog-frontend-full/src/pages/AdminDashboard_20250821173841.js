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
    fullscreen: false, // optional
  });
  const [preview, setPreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  // Fetch Blogs (do NOT overwrite form)
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/blogs`);
      setBlogs(data.blogs || []);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === "image") setPreview(e.target.value);
  };

  // Handle Rich Text (ReactQuill)
  const handleContentChange = (value) => {
    setForm((prev) => ({ ...prev, content: value }));
  };

  // Submit Blog (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, tags: form.tags.split(",").map((t) => t.trim()) };
      if (editingId) {
        await axios.put(`${API_URL}/api/blogs/${editingId}`, payload);
      } else {
        await axios.post(`${API_URL}/api/blogs`, payload);
      }

      setForm({ title: "", content: "", image: "", category: "", tags: "" });
      setPreview(null);
      setEditingId(null);
      fetchBlogs();
    } catch (err) {
      console.error("Failed to save blog:", err);
    }
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

  // Delete Blog
  const deleteBlog = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error("Failed to delete blog:", err);
    }
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
        <h4 className="mb-3">{editingId ? "✏️ Edit Blog Post" : "✍️ Create New Blog"}</h4>
        <form onSubmit={handleSubmit}>
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

          <div className="mb-3">
            <label className="form-label fw-semibold">Content</label>
            <ReactQuill
              theme="snow"
              value={form.content}
              onChange={handleContentChange}
              placeholder="Write your blog content here..."
              style={{ height: "400px", marginBottom: "80px" }}
              className="content-editor"
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Image</label>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Paste image URL"
                name="image"
                value={form.image}
                onChange={handleChange}
              />
              <div className="text-center mb-2">or</div>
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
                    setForm((prev) => ({ ...prev, image: res.data.url }));
                    setPreview(res.data.url);
                  } catch (err) {
                    console.error("Upload failed", err);
                  }
                }}
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="img-fluid mt-2 rounded shadow-sm"
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
              )}
            </div>

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

          <div className="d-flex gap-2">
            <button className="btn btn-primary flex-grow-1 fw-bold">
              {editingId ? "💾 Update Blog" : "🚀 Publish Blog"}
            </button>
            {editingId && (
              <button type="button" className="btn btn-secondary" onClick={cancelEdit}>
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
                        style={{ width: "70px", height: "50px", objectFit: "cover" }}
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
                      <span key={idx} className="badge bg-light text-dark me-1">
                        #{tag}
                      </span>
                    ))}
                  </td>
                  <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => editBlog(blog)}>
                      ✏️ Edit
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteBlog(blog._id)}>
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Extra CSS */}
      <style>{`
        .content-editor .ql-editor {
          min-height: 300px;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
}
