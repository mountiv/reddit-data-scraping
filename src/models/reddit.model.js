const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const RedditSchema = new Schema({
  kind: String,
  data: Object,
});

module.exports = model("Reddit", RedditSchema);
