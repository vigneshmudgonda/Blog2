// src/pages/AdminDashboard.js
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  // ✅ Custom Quill modules (with image upload support)
  const quillModules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"], // 👈 image button
        ["clean"],
      ],
      handlers: {
        image: function () {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.click();

          input.onchange = async () => {
            const file = input.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("image", file);

            try {
              const res = await axios.post(`${API_URL}/api/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });

              const quill = this.quill;
              const range = quill.getSelection();
              quill.insertEmbed(range.index, "image", res.data.url); // 👈 insert uploaded image into editor
            } catch (err) {
              console.error("Image upload failed", err);
            }
          };
        },
      },
    },
  };

  // ✅ Fetch blogs
  const fetchBlogs = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/blogs`);
      setBlogs(res.data.blogs || []);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // ✅ Handle inputs
  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleContentChange = (value) => {
    setForm({ ...form, content: value });
  };

  // ✅ Submit new blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("content", form.content);
      data.append("tags", form.tags);
      if (form.image) data.append("image", form.image);

      await axios.post(`${API_URL}/api/blogs`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setForm({ title: "", content: "", tags: "", image: null });
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Admin Dashboard</h2>

      {/* ✅ Blog Form */}
      <form onSubmit={handleSubmit} className="card p-4 shadow-soft rounded-3 mb-5">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={form.title}
            onChange={handleInput}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Tags (comma separated)</label>
          <input
            type="text"
            className="form-control"
            name="tags"
            value={form.tags}
            onChange={handleInput}
            placeholder="e.g. react, javascript, webdev"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Thumbnail</label>
          <input type="file" className="form-control" onChange={handleFileChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Content</label>
          <ReactQuill
            theme="snow"
            value={form.content}
            onChange={handleContentChange}
            modules={quillModules}
            placeholder="Write your blog content here..."
            style={{ height: "200px", marginBottom: "60px" }}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Save Blog"}
        </button>
      </form>

      {/* ✅ Blog List */}
      <div className="row g-4">
        {blogs.map((b) => (
          <div className="col-md-4" key={b._id}>
            <div className="card h-100 rounded-2xl shadow-soft">
              {b.image && <img src={b.image} className="card-img-top" alt={b.title} />}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{b.title}</h5>
                <p className="text-muted small">{new Date(b.createdAt).toDateString()}</p>
                <div className="mb-2">
                  {Array.isArray(b.tags)
                    ? b.tags.map((tag, i) => (
                        <span key={i} className="badge bg-secondary me-1">
                          {tag}
                        </span>
                      ))
                    : null}
                </div>
                <button className="btn btn-sm btn-outline-danger mt-auto">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {!blogs.length && <p className="text-muted">No blogs added yet.</p>}
      </div>
    </div>
  );
}
