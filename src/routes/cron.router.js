const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const redditController = require("../controllers/reddit.controller");
const rUserController = require("../controllers/reddit.user.controller");

router.get("/posts", function (req, res) {
    postController.savePosts(req, res);
});

router.get("/reddits", function (req, res) {
    redditController.saveReddits(req, res);
});

router.get("/rusers", function (req, res) {
    rUserController.saveRUsers(req, res);
});

module.exports = router;
