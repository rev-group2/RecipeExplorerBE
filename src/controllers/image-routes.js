const express = require("express");
const router = express.Router();
const { imageUpload } = require("../service/image-service.js");
const { authenticateToken } = require("../util/authentication.js");
const { logger } = require("../util/logger.js");

router.post("/", authenticateToken, async (req, res) => {
  try {
    const response = await imageUpload(req.body);
    res.status(200);
    res.send(response);
  } catch (err) {
    logger.error(err.message);
    console.error(err);
  }
});

module.exports = router;
