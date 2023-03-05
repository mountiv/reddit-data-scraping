const express = require("express");
const router = express.Router();
const controller = require("../controllers/reddit.user.controller");

router.get("/rusers", function (req, res) {
  controller.getRUsers(req, res);
});

module.exports = router;
