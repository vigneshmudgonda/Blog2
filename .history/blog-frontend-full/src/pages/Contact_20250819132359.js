import React, { useState } from 'react';
import api from '../services/api';

export default function Contact(){
  const [form,setForm] = useState({name:'',email:'',message:''});
  const [msg,setMsg] = useState('');

  const handleSubmit=async e=>{
    e.preventDefault();
    try{
      const res = await api.post('/api/contact', form);
      setMsg(res.data.message||'Message sent!');
      setForm({name:'',email:'',message:''});
    }catch(e){setMsg('Error sending message');}
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-3">Contact</h2>
      <form onSubmit={handleSubmit} style={{maxWidth:480}}>
        <div className="mb-2"><input className="form-control" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
        <div className="mb-2"><input className="form-control" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
        <div className="mb-2"><textarea className="form-control" placeholder="Message" value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/></div>
        <button className="btn btn-primary">Send</button>
      </form>
      {msg && <p className="mt-3">{msg}</p>}
    </div>
  );
}
