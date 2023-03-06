const { Post, Reddit } = require("../models");

module.exports = {
  savePosts: async function (req, res) {
    const reddits = await Reddit.find({})
      .select("data.display_name")
      .limit(500);
    const currtime = Date.now();
    var ii = 0;
    reddits.map(async (e, i) => {
      const reddit = e.data.display_name;

      require("request-promise")(
        `https://www.reddit.com/r/${reddit}.json?limit=50`
      )
        .then(async function (resData) {
          const result = JSON.parse(resData);
          result.data.children.map(async (e, i) => {
            if (
              Number(currtime) / 1000 - Number(e.data.created) <=
              1 * 60 * 60
            ) {
              ii++;
              const post = new Post({
                kind: e.kind,
                data: e.data,
              });
              console.log(ii);
              await post.save();
            }
          });
        })
        .catch(function (err) {
          // failed ...
        });
    });

    res.send("recent posts saving triggered.");
  },
  getPosts: async function (req, res) {
    const limit = req.query.limit == undefined ? 25 : req.query.limit;
    const offset = req.query.offset == undefined ? 0 : req.query.offset;
    const filter =
      req.query.filter == undefined ? {} : JSON.parse(req.query.filter);

    const posts = await Post.find(filter).limit(limit).skip(offset).exec();
    if (posts.length > 0) {
      res.json({ result: true, data: posts });
    } else {
      res.json({ result: false, data: "not found posts." });
    }
  },
  getLastPosts: async function (req, res) {
    const limit = req.query.limit == undefined ? 25 : req.query.limit;
    const offset = req.query.offset == undefined ? 0 : req.query.offset;
    const filter =
      req.query.filter == undefined ? {} : JSON.parse(req.query.filter);
    const new_filter = Object.assign(filter, {
      "data.subreddit": req.params.reddit,
    });
    const posts = await Post.find(new_filter).limit(limit).skip(offset).exec();
    if (posts.length > 0) {
      res.json({ result: true, data: posts });
    } else {
      res.json({ result: false, data: "not found posts." });
    }
  },
  getPost: async function (req, res) {
    const post = await Post.findOne({ "data.id": req.params.id });
    if (!post) {
      res.json({ result: false, data: "no post." });
    } else {
      res.json({ result: true, data: post });
    }
  },
  deletePost: async function (req, res) {
    const result = await Post.deleteOne({ "data.id": req.params.id });
    if (result.deletedCount == 0) {
      res.json({ result: false, data: "no such post" });
    } else {
      res.json({ result: true, data: "post deleted" });
    }
  },
  searchPosts: async function (req, res) {
    const limit = req.query.limit == undefined ? 25 : req.query.limit;
    const offset = req.query.offset == undefined ? 0 : req.query.offset;
    const filter =
      req.query.filter == undefined ? {} : JSON.parse(req.query.filter);

    const posts = await Post.find(filter).limit(limit).skip(offset).exec();
    if (posts.length > 0) {
      res.json({ result: true, data: posts });
    } else {
      res.json({ result: false, data: "not found posts." });
    }
  },
};
