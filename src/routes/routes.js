const { isAuth } = require("../middleware");

module.exports = function (app) {
  app.use("/api/auth", require("./auth.router"));
  app.use("/api", [isAuth.verifyToken], require("./reddit.user.router"));
  app.use("/api", [isAuth.verifyToken], require("./reddit.router"));
  app.use("/api", [isAuth.verifyToken], require("./post.router"));
  app.use("/cron", require("./cron.router"));
};
