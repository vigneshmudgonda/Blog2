// src/pages/AdminDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", image: "", category: "", tags: "" });
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    const { data } = await axios.get(`${API_URL}/api/blogs`);
    setBlogs(data.blogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/api/blogs`, { ...form, tags: form.tags.split(",") });
    setForm({ title: "", content: "", image: "", category: "", tags: "" });
    fetchBlogs();
  };

  const deleteBlog = async (id) => {
    await axios.delete(`${API_URL}/api/blogs/${id}`);
    fetchBlogs();
  };

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token
    navigate("/login"); // redirect to login
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Admin Dashboard</h2>
        <button className="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Create Blog */}
      <form className="mb-4" onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Title" name="title" value={form.title} onChange={handleChange} />
        <textarea className="form-control mb-2" placeholder="Content" name="content" value={form.content} onChange={handleChange}></textarea>
        <input className="form-control mb-2" placeholder="Image URL" name="image" value={form.image} onChange={handleChange} />
        <input className="form-control mb-2" placeholder="Category" name="category" value={form.category} onChange={handleChange} />
        <input className="form-control mb-2" placeholder="Tags (comma separated)" name="tags" value={form.tags} onChange={handleChange} />
        <button className="btn btn-primary">Add Blog</button>
      </form>

      {/* Blog List */}
      <h4>All Blogs</h4>
      <ul className="list-group">
        {blogs.map((blog) => (
          <li key={blog._id} className="list-group-item d-flex justify-content-between align-items-center">
            {blog.title}
            <button className="btn btn-danger btn-sm" onClick={() => deleteBlog(blog._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
