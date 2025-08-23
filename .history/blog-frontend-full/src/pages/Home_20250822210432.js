{/* Recent Posts */}
<section className="container my-5">
  <div className="row">
    <div className="col-lg-8">
      <h2 className="fw-bold mb-4">
        {category ? `Posts in "${category}"` : "Recent Posts"}
      </h2>
      <div className="row g-4">
        {posts.slice(0, 2).map(p => (   // ✅ show max 2 posts
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
          Hi. I’m (Your Name), a software developer and content creator. 
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
