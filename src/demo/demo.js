const rp = require("request-promise");
require("dotenv").config();

const host = process.env.HOST;
const port = process.env.PORT;

rp1 = rp(`http://${host}:${port}/cron/reddits`)
  .then(function (res) {
    console.log(res);
  })
  .catch(function (err) {});

rp2 = rp(`http://${host}:${port}/cron/rusers`)
  .then(function (res) {
    console.log(res);
  })
  .catch(function (err) {});

console.log("triggered demo app");