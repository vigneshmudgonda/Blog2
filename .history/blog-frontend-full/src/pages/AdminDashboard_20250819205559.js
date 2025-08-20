// src/pages/AdminDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// ✅ Axios instance with token
const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    image: "",
    category: "",
    tags: "",
  });

  const fetchBlogs = async () => {
    try {
      const { data } = await api.get("/api/blogs");
      setBlogs(data.blogs);
    } catch (err) {
      console.error("Error fetching blogs:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/blogs", {
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()),
      });
      setForm({ title: "", content: "", image: "", category: "", tags: "" });
      fetchBlogs();
    } catch (err) {
      console.error("Error creating blog:", err.response?.data || err.message);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await api.delete(`/api/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error("Error deleting blog:", err.response?.data || err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>

      {/* Create Blog */}
      <form className="mb-4" onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Content"
          name="content"
          value={form.content}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          placeholder="Image URL"
          name="image"
          value={form.image}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          placeholder="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          placeholder="Tags (comma separated)"
          name="tags"
          value={form.tags}
          onChange={handleChange}
        />
        <button className="btn btn-primary">Add Blog</button>
      </form>

      {/* Blog List */}
      <h4>All Blogs</h4>
      <ul className="list-group">
        {blogs.map((blog) => (
          <li
            key={blog._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {blog.title}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteBlog(blog._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
