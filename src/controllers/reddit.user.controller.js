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
  }
};