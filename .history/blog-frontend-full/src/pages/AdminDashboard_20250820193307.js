// src/pages/AdminDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/blogs`);
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "image") {
      setPreview(e.target.value); // show preview for URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/api/blogs/${editingId}`, form);
      } else {
        await axios.post(`${API_URL}/api/blogs`, form);
      }
      setForm({ title: "", content: "", image: "" });
      setEditingId(null);
      setPreview("");
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (blog) => {
    setForm(blog);
    setEditingId(blog._id);
    setPreview(blog.image);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Dashboard</h2>

      {/* Blog Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          {/* Title */}
          <div className="col-md-6 mb-3">
            <label className="form-label fw-semibold">Title</label>
            <input
              className="form-control"
              placeholder="Enter title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Image: URL or File */}
          <div className="col-md-6 mb-3">
            <label className="form-label fw-semibold">Image</label>

            {/* Option 1: Paste URL */}
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Paste image URL"
              name="image"
              value={form.image}
              onChange={handleChange}
            />

            <div className="text-center mb-2">or</div>

            {/* Option 2: Upload File */}
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
                  setForm({ ...form, image: res.data.url }); // backend must return { url: "uploaded_link" }
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
        </div>

        {/* Content */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Content</label>
          <ReactQuill
            theme="snow"
            value={form.content}
            onChange={(val) => setForm({ ...form, content: val })}
          />
        </div>

        <button className="btn btn-primary" type="submit">
          {editingId ? "Update Blog" : "Add Blog"}
        </button>
      </form>

      {/* Blog List */}
      <h4>All Blogs</h4>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id}>
              <td>{blog.title}</td>
              <td>
                {blog.image && (
                  <img
                    src={blog.image}
                    alt="blog"
                    style={{ width: "80px", height: "60px", objectFit: "cover" }}
                  />
                )}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(blog)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
