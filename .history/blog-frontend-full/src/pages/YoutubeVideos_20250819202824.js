// src/pages/YoutubeVideos.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function YoutubeVideos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const { data } = await axios.get(`${API_URL}/api/youtube/latest`);
      setVideos(data);
    };
    fetchVideos();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Latest YouTube Videos</h2>
      <div className="row">
        {videos.map((video) => (
          <div key={video.videoId} className="col-md-4 mb-3">
            <div className="card">
              <iframe
                width="100%"
                height="200"
                src={`https://www.youtube.com/embed/${video.videoId}`}
                title={video.title}
                allowFullScreen
              ></iframe>
              <div className="card-body">
                <h6 className="card-title">{video.title}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
