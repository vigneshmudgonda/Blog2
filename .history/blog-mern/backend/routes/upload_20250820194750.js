// backend/routes/upload.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// Save uploaded images in /uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// POST /api/upload
router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  // Return the file URL (adjust if you host differently)
  res.json({ url: `/uploads/${req.file.filename}` });
});

module.exports = router;
