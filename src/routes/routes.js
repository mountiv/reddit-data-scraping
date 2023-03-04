const { isAuth } = require("../middleware");

module.exports = function (app) {
  app.use("/api/auth", require("./auth.router"));
};
