const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const host = process.env.HOST;
const port =
  process.env.NODE_ENV == "development"
    ? process.env.DEV_PORT
    : process.env.PROD_PORT;
const db = process.env.DB_PATH;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(db);
  console.log(`${process.env.NODE_ENV} database connected`);
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send("works!");
});

app.use("*", function (req, res) {
  res.send("Can't found this page!");
});

app.listen(port, () => {
  console.log(
    `${process.env.NODE_ENV} server running on http://${host}:${port}`
  );
});
