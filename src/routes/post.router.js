const express = require("express");
const router = express.Router();
const controller = require("../controllers/post.controller");

router.get("/posts", function (req, res) {
  controller.getPosts(req, res);
});

router.get("/posts/:reddit", function (req, res) {
  controller.getLastPosts(req, res);
});

router.get("/post/:id", function (req, res) {
  controller.getPost(req, res);
});

router.delete("/post/:id", function (req, res) {
  controller.deletePost(req, res);
});

router.get("/post/search", function (req, res) {
  controller.searchPosts(req, res);
});

module.exports = router;
