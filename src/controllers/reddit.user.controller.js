const { RUser } = require("../models");

let redditCount = 0;

async function saveAllRUsers(previousRUser) {
  if (previousRUser == null) {
    console.log("users saving fished");
    return;
  }
  if (previousRUser == "ThisIsMyRandomString...") previousRUser = null;
  await require("request-promise")(
    `https://reddit.com/users.json?limit=100&after=${previousRUser}`
  )
    .then(async function (resData) {
      // response
      const result = JSON.parse(resData);
      await RUser.insertMany(result.data.children)
        .then((docs) => {})
        .catch((err) => {});
      console.log((redditCount += result.data.children.length));
      saveAllRUsers(result.data.after);
    })
    .catch(function (err) {
      // failed ...
    });
}

module.exports = {
  saveRUsers: async function (req, res) {
    saveAllRUsers("ThisIsMyRandomString...");
    res.send("all users saving triggered.");
  },
  getRUsers: async function (req, res) {
    const limit = req.query.limit == undefined ? 25 : req.query.limit;
    const offset = req.query.offset == undefined ? 0 : req.query.offset;
    const filter =
      req.query.filter == undefined ? {} : JSON.parse(req.query.filter);
    const users = await RUser.find(filter).limit(limit).skip(offset).exec();
    if (users.length > 0) {
      res.json({ result: true, data: users });
    } else {
      res.json({ result: false, data: "not found users." });
    }
  },
};