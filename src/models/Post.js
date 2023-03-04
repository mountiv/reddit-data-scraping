const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema({
  kind: String,
  data: Object,
});

const Post = model("Post", postSchema);

module.exports = Post;
