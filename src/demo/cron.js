const cron = require("node-cron");
const rp = require("request-promise");
require("dotenv").config();

const host = process.env.HOST;
const port = process.env.PORT;
const interval = process.env.CRON_INTERVAL;

cron.schedule(interval, () => {
  rp1 = rp(`http://${host}:${port}/cron/posts`)
    .then(function (res) {
      // response
      console.log(res);
    })
    .catch(function (err) {
      // failed ...
    });
});

console.log("started cron app");