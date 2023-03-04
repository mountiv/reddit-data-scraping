const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRET;

checkEmail = async function (req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(200).json({ msg: "available email" });
  } else {
    res.status(400).json({ msg: "that email already taken!" });
  }
};

checkUsername = async function (req, res) {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    res.status(200).send("available username");
  } else {
    res.status(200).send("that username already taken!");
  }
};

signup = async function (req, res) {
  try {
    const user = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });
    await user.save();
    res.status(200).send("userdata saved in database.");
  } catch (err) {
    res.status(200).send(err.message);
  }
};

login = async function (req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }
    return res.status(200).json({
      token: jwt.sign(
        { email: user.email, username: user.username, _id: user._id },
        secret,
        { expiresIn: 24 * 60 * 60 }
      ),
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = {
  checkEmail: checkEmail,
  checkUsername: checkUsername,
  signup: signup,
  login: login,
};
