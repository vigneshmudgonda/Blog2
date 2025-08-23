import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function BlogList(){
  const [blogs, setBlogs] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchBlogs = useCallback(async ()=>{
    setLoading(true);
    try{
      const res = await api.get('/api/blogs', { params: { q } });
      setBlogs(res.data.blogs || []);
    }catch(e){ console.error(e); }
    setLoading(false);
  },[q]);

  useEffect(()=>{ fetchBlogs(); },[fetchBlogs]);

  // ✅ helper function to strip HTML tags
  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center mb-3">
        <h2 className="me-auto fw-bold">Blog</h2>
        <div className="input-group" style={{maxWidth: 360}}>
          <input 
            className="form-control" 
            placeholder="Search..." 
            value={q} 
            onChange={e=>setQ(e.target.value)} 
          />
          <button className="btn btn-primary" onClick={fetchBlogs}>Search</button>
        </div>
      </div>

      {loading ? <p>Loading...</p> : (
        <div className="row g-4">
          {blogs.map(b => (
            <div className="col-md-4" key={b._id}>
              <div className="card h-100 rounded-2xl shadow-soft post-card">
                {b.image && <img src={b.image} className="card-img-top" alt={b.title}/>}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{b.title}</h5>
                  <p className="text-muted small">{new Date(b.createdAt || Date.now()).toDateString()}</p>

                  {/* ✅ Strip HTML before showing preview */}
                  <p className="card-text flex-grow-1">
                    {stripHtml(b.content || "").slice(0, 120)}...
                  </p>

                  <Link to={`/blog/${b._id}`} className="btn btn-outline-primary mt-auto">Read</Link>
                </div>
              </div>
            </div>
          ))}
          {!blogs.length && <p className="text-muted">No posts found.</p>}
        </div>
      )}
    </div>
  );
}
