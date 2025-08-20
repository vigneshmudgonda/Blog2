import React from 'react';

export default function About(){
  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-3">About Me</h2>
      <p>Hi. I’m (Your Name), a software developer and content creator. I share tutorials, tips, and insights on web development and programming. Stay tuned for more content!</p>
      <a className="btn btn-primary" href={process.env.REACT_APP_YOUTUBE_URL||'              <a href="https://twitter.com" className="text-light"><FaTwitter /></a>
      '} target="_blank" rel="noreferrer">My YouTube Channel</a>
    </div>
  );
}
