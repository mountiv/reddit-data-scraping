const { isAuth } = require("../middleware");

module.exports = function (app) {
  app.use("/api/auth", require("./auth.router"));
  app.use("/cron", require("./cron.router"));
};
