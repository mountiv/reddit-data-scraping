const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const redditSchema = new Schema({
  kind: String,
  data: Object,
});

const Reddit = model("Reddit", redditSchema);

module.exports = Reddit;
