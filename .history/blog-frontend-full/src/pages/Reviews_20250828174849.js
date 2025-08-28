import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import api from '../services/api';

export default function Reviews(){
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({name:'',review:'',rating:5});

  useEffect(()=>{
    api.get('/api/reviews').then(res=>setReviews(res.data||[]));
  },[]);

  const handleSubmit = async e => {
    e.preventDefault();
    try{
      await api.post('/api/reviews', form);
      setReviews([{...form, date:new Date()}, ...reviews]);
      setForm({name:'',review:'',rating:5});
    }catch(e){ console.error(e); }
  };

  return (
    <div className="container py-4">
      <Helmet>
        <title>Reviews | Unique Tech</title>
        <meta 
          name="description" 
          content="Read user reviews and share your feedback about Unique Tech. Submit your own review and rating to help others." 
        />
      </Helmet>

      <h2 className="fw-bold mb-3">Reviews</h2>
      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="mb-2">
          <input 
            className="form-control" 
            placeholder="Name" 
            value={form.name} 
            onChange={e=>setForm({...form,name:e.target.value})}
          />
        </div>
        <div className="mb-2">
          <textarea 
            className="form-control" 
            placeholder="Review" 
            value={form.review} 
            onChange={e=>setForm({...form,review:e.target.value})}
          />
        </div>
        <div className="mb-2">
          <input 
            type="number" 
            className="form-control" 
            min="1" 
            max="5" 
            value={form.rating} 
            onChange={e=>setForm({...form,rating:e.target.value})}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
      <ul className="list-group">
        {reviews.map((r,i)=>(
          <li key={i} className="list-group-item">
            <strong>{r.name}</strong>: {r.review} ⭐{r.rating}
          </li>
        ))}
      </ul>
    </div>
  );
}
