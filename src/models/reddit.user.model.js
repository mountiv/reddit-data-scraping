const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const RedditUserSchema = new Schema({
  kind: String,
  data: Object,
});

module.exports = model("RUser", RedditUserSchema);
