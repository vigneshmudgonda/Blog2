import React,{useState} from 'react';
import api from '../services/api';

export default function AdminLogin(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [msg,setMsg] = useState('');

  const handleSubmit=async e=>{
    e.preventDefault();
    try{
      const res = await api.post(' http://localhost:5000/api/login',{email,password});
      localStorage.setItem('token',res.data.token);
      setMsg('Login success!');
    }catch(e){ setMsg('Invalid credentials'); }
  };

  return (
    <div className="container py-4" style={{maxWidth:480}}>
      <h2 className="fw-bold mb-3">Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2"><input className="form-control" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/></div>
        <div className="mb-2"><input type="password" className="form-control" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/></div>
        <button className="btn btn-primary">Login</button>
      </form>
      {msg && <p className="mt-3">{msg}</p>}
    </div>
  );
}
