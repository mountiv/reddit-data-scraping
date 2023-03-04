const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PostSchema = new Schema({
  kind: String,
  data: Object,
});

module.exports = model("Post", PostSchema);
