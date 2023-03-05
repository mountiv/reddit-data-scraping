const express = require("express");
const router = express.Router();
const controller = require("../controllers/reddit.controller");

router.get("/reddits", function (req, res) {
  controller.getReddits(req, res);
});

module.exports = router;
