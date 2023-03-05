const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const redditController = require("../controllers/reddit.controller");
const rUserController = require("../controllers/reddit.user.controller");

router.get("/cron/reddits", function (req, res) {
    redditController.saveReddits(req, res);
});

router.get("/cron/rusers", function (req, res) {
    rUserController.saveRUsers(req, res);
});