const express = require("express");
const multer = require("multer");
const router = express.Router();
const { imageUpload } = require("../service/image-service.js");
const { authenticateToken } = require("../util/authentication.js");
const { logger } = require("../util/logger.js");
const upload = multer({ limits: { fileSize: 50000000 } });

router.post("/", upload.single("file"), authenticateToken, async (req, res) => {
  try {
    const response = await imageUpload(req.file);
    res.status(200);
    res.send(response);
  } catch (err) {
    logger.error(err.message);
    console.error(err.message);
  }
});

module.exports = router;
