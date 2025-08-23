import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

export default function BlogDetail(){
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(()=>{
    const fetchBlog = async ()=>{
      try{
        const res = await api.get(`/api/blogs/${id}`);
        setBlog(res.data);
      }catch(e){ console.error(e); }
    };
    fetchBlog();
  },[id]);

  if(!blog) return <div className="container py-4">Loading...</div>;

  return (
    <div className="container py-4">
      <h2 className="fw-bold">{blog.title}</h2>
      <p className="text-muted small">{new Date(blog.createdAt||Date.now()).toDateString()}</p>
      {blog.image && <img src={blog.image} alt={blog.title} className="img-fluid rounded mb-3"/>}
      <p>{blog.content}</p>
    </div>
  );
}
