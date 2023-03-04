const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  kind: String,
  data: Object,
});

const User = model("User", userSchema);

module.exports = User;
