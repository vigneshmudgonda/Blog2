// src/pages/Home.js
import React, { useEffect, useState } from 'react'; 
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from "react-helmet";   // ✅ Import Helmet
import api from '../services/api';

export default function Home(){
  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(()=>{
    (async ()=>{
      try{
        const res = await api.get('/api/blogs', { 
          params: { 
            limit: 6,
            page: 1, 
            category: category || undefined
          } 
        });
        setPosts(res.data.blogs || []);
      }catch(e){ 
        console.error(e); 
      }
    })();
  },[category]);

  // ✅ helper function to strip HTML tags
  const stripHtml = (html) => {
    return html.replace(/<[^>]+>/g, '');
  };

  return (
    <div>
      {/* ✅ Helmet for SEO */}
      <Helmet>
        <title>{category ? `Posts in ${category}` : "Home"} | Unique Tech</title>
        <meta 
          name="description" 
          content={category 
            ? `Read the latest blog posts in ${category} category on Unique Tech.` 
            : "Welcome to Unique Tech blog. Explore tutorials, tips, and insights on web development and programming."} 
        />
      </Helmet>

      {/* Hero Section */}
      <section className="hero py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <h1 className="display-4 fw-bold">Welcome to<br/>My Blog</h1>
              <p className="lead text-muted">Sharing my thoughts, experiences, and insights.</p>
              <a 
                href={process.env.REACT_APP_YOUTUBE_URL || 'https://www.youtube.com/@UNIQUETECH03'} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-primary btn-lg"
              >
                Subscribe to my YouTube channel!
              </a>
            </div>
            <div className="col-lg-5">
              <div
                className="rounded-circle ratio ratio-1x1 d-flex align-items-center justify-content-center shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #6a11cb, #2575fc)", 
                  padding: "12px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1)", 
                  border: "4px solid #fff"
                }}
              >
                <img
                  alt="Profile"
                  className="rounded-circle w-100 h-100 object-fit-cover border border-3 border-white shadow"
                  src="channel logo.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="container my-5">
        <div className="row">
          <div className="col-lg-8">
            <h2 className="fw-bold mb-4">
              {category ? `Posts in "${category}"` : "Recent Posts"}
            </h2>
            <div className="row g-4">
              {posts.slice(0, 2).map(p => (
                <div className="col-md-6" key={p._id}>
                  <div className="card rounded-2xl shadow-soft post-card h-100">
                    {p.image && (
                      <img src={p.image} className="card-img-top" alt={p.title}/>
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{p.title}</h5>
                      <p className="text-muted small mb-2">
                        {new Date(p.createdAt || Date.now()).toDateString()}
                      </p>
                      <p className="card-text">
                        {stripHtml(p.content || '').slice(0, 100)}...
                      </p>
                      <Link 
                        to={`/blog/${p._id}`} 
                        className="btn btn-outline-primary btn-sm"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              {!posts.length && <p className="text-muted">No posts found.</p>}
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="mb-4 p-4 bg-white rounded-2xl shadow-soft">
              <h4 className="fw-bold">About Me</h4>
              <p className="text-muted">
                Hi. I’m Vignesh Mudgonda, a software developer and content creator. 
                I share tutorials, tips, and insights on web development and programming. Stay tuned!
              </p>
              <a 
                className="btn btn-primary" 
                href={process.env.REACT_APP_YOUTUBE_URL || 'https://www.youtube.com/@UNIQUETECH03'} 
                target="_blank" 
                rel="noreferrer"
              >
                View My YouTube Channel!
              </a>
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
