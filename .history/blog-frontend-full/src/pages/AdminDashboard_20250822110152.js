// src/pages/AdminDashboard.js
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DragAndDrop from "quill-drag-and-drop-module";
import Table from "quill-table-ui";
import "quill-table-ui/dist/index.css";

// ✅ Register Quill Modules
Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/dragAndDrop", DragAndDrop);
Quill.register("modules/table", Table);

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function AdminDashboard() {
  const quillRef = useRef(null);

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

  // ✅ Undo/Redo handlers
  const undoChange = () => quillRef.current?.getEditor().history.undo();
  const redoChange = () => quillRef.current?.getEditor().history.redo();

  // ✅ Quill Modules
  const quillModules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["link", "image", "video", "table"],
        ["undo", "redo"],
        ["clean"],
      ],
      handlers: {
        undo: undoChange,
        redo: redoChange,
      },
    },
    history: { delay: 500, maxStack: 100, userOnly: true },
    imageResize: { parchment: Quill.import("parchment"), modules: ["Resize", "DisplaySize", "Toolbar"] },
    table: true,
    dragAndDrop: {
      draggables: [
        { content_type_pattern: /^image\//, tag: "img", attr: "src" },
        { content_type_pattern: /^video\//, tag: "video", attr: "src" },
        { content_type_pattern: /^text\/html$/, tag: "iframe", attr: "src" },
      ],
    },
  };

  // ✅ Fetch Blogs
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/blogs`);
      setBlogs(data.blogs);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ✅ Form Handlers
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "image") setPreview(e.target.value);
  };
  const handleContentChange = (value) => setForm({ ...form, content: value });

  // ✅ Submit Blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, tags: form.tags.split(",").map((t) => t.trim()) };
    if (editingId) await axios.put(`${API_URL}/api/blogs/${editingId}`, payload);
    else await axios.post(`${API_URL}/api/blogs`, payload);

    setForm({ title: "", content: "", image: "", category: "", tags: "" });
    setPreview(null);
    setEditingId(null);
    fetchBlogs();
  };

  // ✅ Delete/Edit/Cancel
  const deleteBlog = async (id) => { await axios.delete(`${API_URL}/api/blogs/${id}`); fetchBlogs(); };
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
  const cancelEdit = () => {
    setForm({ title: "", content: "", image: "", category: "", tags: "" });
    setPreview(null);
    setEditingId(null);
  };

  const handleLogout = () => { localStorage.removeItem("token"); navigate("/login"); };

  return (
    <div className="container my-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">🛠️ Admin Dashboard</h2>
        <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
      </div>

      {/* Blog Form */}
      <div className="card shadow p-4 mb-5 border-0">
        <h4 className="mb-3">{editingId ? "✏️ Edit Blog Post" : "✍️ Create New Blog"}</h4>
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

          {/* Content Editor */}
          <div className="mb-3">
            <div
              className="border rounded shadow-sm"
              style={{
                position: isFullscreen ? "fixed" : "relative",
                top: isFullscreen ? 0 : "auto",
                left: isFullscreen ? 0 : "auto",
                width: isFullscreen ? "100vw" : "100%",
                height: isFullscreen ? "100vh" : "400px",
                zIndex: isFullscreen ? 9999 : "auto",
                background: "#fff",
                padding: isFullscreen ? "20px" : "10px",
                boxSizing: "border-box",
              }}
            >
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setIsFullscreen((prev) => !prev)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  zIndex: 10000,
                  borderRadius: "8px",
                  padding: "4px 10px",
                  fontSize: "0.9rem",
                }}
              >
                {isFullscreen ? "🗗 Minimize" : "🗖 Maximize"}
              </button>

              <input type="hidden" name="content" value={form.content} required />

              <ReactQuill
                ref={quillRef}
                key={editingId || "new"}
                value={form.content}
                onChange={handleContentChange}
                modules={quillModules}
                placeholder="Write your blog content here..."
                style={{ height: isFullscreen ? "80vh" : "300px", border: "none" }}
              />

              <div className="text-end mt-3">
                <button type="submit" className="btn btn-success fw-bold">
                  {editingId ? "💾 Save Changes" : "💾 Save Blog"}
                </button>
              </div>
            </div>
          </div>

          {/* Image, Category, Tags */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Image</label>
              <input type="text" className="form-control mb-2" placeholder="Paste image URL" name="image" value={form.image} onChange={handleChange} />
              <div className="text-center mb-2">or</div>
              <input type="file" className="form-control" accept="image/*" onChange={async (e) => {
                const file = e.target.files[0]; if(!file) return;
                const formData = new FormData(); formData.append("image", file);
                try { const res = await axios.post(`${API_URL}/api/upload`, formData, { headers: { "Content-Type": "multipart/form-data" } }); setForm({ ...form, image: res.data.url }); setPreview(res.data.url); } catch(err){console.error(err);}
              }}/>
              {preview && <img src={preview} alt="Preview" className="img-fluid mt-2 rounded shadow-sm" style={{ maxHeight: "200px", objectFit: "cover" }}/>}
            </div>

            <div className="col-md-3 mb-3">
              <label className="form-label fw-semibold">Category</label>
              <input className="form-control" placeholder="e.g. Tech" name="category" value={form.category} onChange={handleChange}/>
            </div>

            <div className="col-md-3 mb-3">
              <label className="form-label fw-semibold">Tags</label>
              <input className="form-control" placeholder="comma separated" name="tags" value={form.tags} onChange={handleChange}/>
            </div>
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-primary flex-grow-1 fw-bold">{editingId ? "🚀 Update Blog" : "🚀 Publish Blog"}</button>
            {editingId && <button type="button" className="btn btn-secondary" onClick={cancelEdit}>❌ Cancel</button>}
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
              {blogs.map(blog => (
                <tr key={blog._id}>
                  <td>{blog.image ? <img src={blog.image} alt={blog.title} style={{ width:"70px", height:"50px", objectFit:"cover" }} className="rounded"/> : "—"}</td>
                  <td className="fw-semibold">{blog.title}</td>
                  <td>{blog.category}</td>
                  <td>{blog.tags?.map((t,i)=><span key={i} className="badge bg-light text-dark me-1">#{t}</span>)}</td>
                  <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2" onClick={()=>editBlog(blog)}>✏️ Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={()=>deleteBlog(blog._id)}>❌ Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
