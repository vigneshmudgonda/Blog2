import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Home(){
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    (async ()=>{
      try{
        const res = await api.get('/api/blogs', { params: { limit: 2, page: 1 } });
        setPosts(res.data.blogs || []);
      }catch(e){ console.error(e); }
    })();
  },[]);

  return (
    <div>
      <section className="hero py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <h1 className="display-4 fw-bold">Welcome to<br/>My Blog</h1>
              <p className="lead text-muted">Sharing my thoughts, experiences, and insights.</p>
              <a href={process.env.REACT_APP_YOUTUBE_URL || '#'} target="_blank" rel="noreferrer" className="btn btn-primary btn-lg">Subscribe to my YouTube channel!</a>
            </div>
            <div className="col-lg-5">
              <div
  className="rounded-circle ratio ratio-1x1 d-flex align-items-center justify-content-center shadow-lg"
  style={{
    background: "linear-gradient(135deg, #6a11cb, #2575fc)", // stylish gradient
    padding: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1)", // soft shadows
    border: "4px solid #fff" // white border ring
  }}
>
  <img
    alt="Profile"
    className="rounded-circle w-100 h-100 object-fit-cover border border-3 border-white shadow"
    src="picofme.png"
  />
</div>

            </div>
          </div>
        </div>
      </section>

      <section className="container my-5">
        <div className="row">
          <div className="col-lg-8">
            <h2 className="fw-bold mb-4">Recent Posts</h2>
            <div className="row g-4">
              {posts.map(p => (
                <div className="col-md-6" key={p._id}>
                  <div className="card rounded-2xl shadow-soft post-card h-100">
                    {p.image && <img src={p.image} className="card-img-top" alt={p.title}/>}
                    <div className="card-body">
                      <h5 className="card-title">{p.title}</h5>
                      <p className="text-muted small mb-2">{new Date(p.createdAt || Date.now()).toDateString()}</p>
                      <p className="card-text">{(p.content || '').slice(0,100)}...</p>
                      <Link to={`/blog/${p._id}`} className="btn btn-outline-primary btn-sm">Read More</Link>
                    </div>
                  </div>
                </div>
              ))}
              {!posts.length && <p className="text-muted">No posts yet.</p>}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="mb-4 p-4 bg-white rounded-2xl shadow-soft">
              <h4 className="fw-bold">About Me</h4>
              <p className="text-muted">Hi. I’m (Your Name), a software developer and content creator. I share tutorials, tips, and insights on web development and programming. Stay tuned!</p>
              <a className="btn btn-primary" href={process.env.REACT_APP_YOUTUBE_URL || '#'} target="_blank" rel="noreferrer">View My YouTube Channel!</a>
            </div>
            <div className="p-4 bg-white rounded-2xl shadow-soft">
              <h4 className="fw-bold">Contact</h4>
              <Link className="btn btn-outline-primary" to="/contact">Send a Message</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
