const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

// Storage config
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "blog_uploads", // Cloudinary folder name
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });

// Upload route
router.post("/", upload.single("image"), (req, res) => {
  try {
    res.json({ url: req.file.path }); // Cloudinary returns secure URL
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;
