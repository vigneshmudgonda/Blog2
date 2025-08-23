import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Optional: add ImageResize module if you want resizing
import ImageResize from 'quill-image-resize-module-react';
Quill.register('modules/imageResize', ImageResize);

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
  const navigate = useNavigate();

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
    if (e.target.name === "image") setPreview(e.target.value);
  };

  // Handle Rich Text Change
  const handleContentChange = (value) => setForm({ ...form, content: value });

  // Quill Modules & Toolbar including Image Button
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image'], // <-- image button added
        ['clean']
      ],
      handlers: {
        image: function() {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.click();

          input.onchange = async () => {
            const file = input.files[0];
            if (file) {
              const formData = new FormData();
              formData.append('image', file);
              try {
                const res = await axios.post(`${API_URL}/api/upload`, formData, {
                  headers: { 'Content-Type': 'multipart/form-data' }
                });
                const range = this.quill.getSelection();
                this.quill.insertEmbed(range.index, 'image', res.data.url);
              } catch (err) {
                console.error("Image upload failed", err);
              }
            }
          };
        }
      }
    },
    imageResize: {} // optional
  }), []);

  // Submit Blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()) };
    if (editingId) {
      await axios.put(`${API_URL}/api/blogs/${editingId}`, payload);
    } else {
      await axios.post(`${API_URL}/api/blogs`, payload);
    }
    setForm({ title: "", content: "", image: "", category: "", tags: "" });
    setPreview(null);
    setEditingId(null);
    fetchBlogs();
  };

  // ... rest of your delete, edit, cancelEdit, logout logic stays the same

  return (
    <div className="container my-5">
      {/* ... header, form fields ... */}
      <div className="mb-3">
        <label className="form-label fw-semibold">Content</label>
        <ReactQuill
          theme="snow"
          value={form.content}
          onChange={handleContentChange}
          modules={modules}
          placeholder="Write your blog content here..."
          style={{ height: '400px', marginBottom: '80px' }}
          className="content-editor"
        />
      </div>
      {/* ... rest of your form & blog list ... */}
    </div>
  );
}
