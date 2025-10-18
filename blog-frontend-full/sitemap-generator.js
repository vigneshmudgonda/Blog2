// sitemap-generator.js
const fs = require("fs");
const path = require("path");

// ✅ Replace this with your real deployed domain
const baseUrl = "https://uniquetech03.netlify.app";

const pages = [
  "",                    // Home page
  "/about",              // About Us page
  "/contact",            // Contact page
  "/services",           // Services or Features page
  "/projects",           // Projects / Portfolio page
  "/blog",               // Blog listing page
  "/blog/web-development-trends", // Example blog post (add more below)
  "/blog/how-to-build-mern-app",
  "/login",              // Login page
  "/signup",             // Signup / Register page
  "/dashboard",          // User dashboard (if applicable)
  "/privacy-policy",     // Legal pages
  "/terms-and-conditions"
];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === "" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

const outputDir = path.join(__dirname, "public");
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

fs.writeFileSync(path.join(outputDir, "sitemap.xml"), sitemapContent, "utf8");

console.log("✅ Sitemap generated successfully!");
