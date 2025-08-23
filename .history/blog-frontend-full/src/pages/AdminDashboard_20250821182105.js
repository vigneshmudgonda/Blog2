// src/pages/AdminDashboard.js
import React, { useEffect, useState, lazy, Suspense } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ReactQuill = lazy(() => import("react-quill"));

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

  // Quill modules
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
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
    setForm({ ...form, content: value || "" });
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
      title: blog.title || "",
      content: blog.content || "", // ✅ always string
      image: blog.image || "",
      category: blog.category || "",
      tags: blog.tags?.join(", ") || "",
    });
    setPreview(blog.image || null);
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
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>

      {/* Blog Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="form-control mb-2"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          className="form-control mb-2"
          value={form.image}
          onChange={handleChange}
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="img-thumbnail mb-2"
            style={{ maxHeight: "200px" }}
          />
        )}
        <input
          type="text"
          name="category"
          placeholder="Category"
          className="form-control mb-2"
          value={form.category}
          onChange={handleChange}
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          className="form-control mb-2"
          value={form.tags}
          onChange={handleChange}
        />

        {/* ✅ Rich Text Editor */}
        <div
          className={`border rounded p-2 mb-3 ${
            isFullscreen ? "fullscreen-editor" : ""
          }`}
          style={{
            position: isFullscreen ? "fixed" : "relative",
            top: isFullscreen ? "0" : "auto",
            left: isFullscreen ? "0" : "auto",
            width: isFullscreen ? "100vw" : "100%",
            height: isFullscreen ? "100vh" : "300px",
            background: "#fff",
            zIndex: isFullscreen ? "9999" : "1",
          }}
        >
          <Suspense fallback={<div>Loading editor...</div>}>
            <ReactQuill
              key={editingId || "new"} // ✅ fixes blank issue
              value={form.content}
              onChange={handleContentChange}
              modules={quillModules}
              placeholder="Write your blog content here..."
              style={{ height: isFullscreen ? "90vh" : "250px" }}
            />
          </Suspense>
          <button
            type="button"
            className="btn btn-sm btn-secondary mt-2"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </button>
        </div>

        <button type="submit" className="btn btn-primary me-2">
          {editingId ? "Update Blog" : "Add Blog"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={cancelEdit}
            className="btn btn-warning"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Blog List */}
      <h3>All Blogs</h3>
      <div className="row">
        {blogs.map((blog) => (
          <div className="col-md-4 mb-3" key={blog._id}>
            <div className="card">
              {blog.image && (
                <img
                  src={blog.image}
                  className="card-img-top"
                  alt={blog.title}
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">
                  <small>Category: {blog.category}</small>
                </p>
                <button
                  className="btn btn-sm btn-info me-2"
                  onClick={() => editBlog(blog)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteBlog(blog._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
