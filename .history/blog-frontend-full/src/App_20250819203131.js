import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import About from './pages/About';
import AdminLogin from './pages/AdminLogin';

import AdminDashboard from "./pages/AdminDashboard";
import YoutubeVideos from "./pages/YoutubeVideos";

export default function App(){
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar/>
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/blog" element={<BlogList/>} />
          <Route path="/blog/:id" element={<BlogDetail/>} />
          <Route path="/reviews" element={<Reviews/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/login" element={<AdminLogin/>} />

          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}
