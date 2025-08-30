module.exports = {
  crawl: false, // don’t auto-crawl
  include: [
    "/",                 // homepage
    "/about",            // About page
    "/contact",          // Contact page
    "/blog",             // Blog listing page
    "/reviews",          // Reviews page
    "/privacy-policy",   // Privacy Policy
    "/terms",            // Terms & Conditions
    "/disclaimer"        // Disclaimer
    

    // ⚡ Optional: Add 2–3 actual blog detail pages manually (like /blog/123 or /blog/my-first-post)
  ],
  puppeteerArgs: ["--no-sandbox", "--disable-setuid-sandbox"],
  source: "build",
  destination: "build",
};

