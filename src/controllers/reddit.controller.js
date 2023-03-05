const { Reddit } = require("../models");

let redditCount = 0;

async function saveAllReddits(previousReddit) {
  if (previousReddit == null) {
    console.log("reddit saving fished");
    return;
  }
  if (previousReddit == "ThisIsMyRandomString...") previousReddit = null;
  await require("request-promise")(
    `https://reddit.com/reddits.json?limit=100&after=${previousReddit}`
  )
    .then(async function (resData) {
      // response
      const result = JSON.parse(resData);
      await Reddit.insertMany(result.data.children)
        .then((docs) => {})
        .catch((err) => {});
      console.log((redditCount += result.data.children.length));
      saveAllReddits(result.data.after);
    })
    .catch(function (err) {
      // failed ...
    });
}

module.exports = {
  saveReddits: async function (req, res) {
    saveAllReddits("ThisIsMyRandomString...");
    res.send("all reddits saving triggered.");
  },
  getReddits: async function (req, res) {
    const limit = req.query.limit == undefined ? 25 : req.query.limit;
    const offset = req.query.offset == undefined ? 0 : req.query.offset;
    const filter =
      req.query.filter == undefined ? {} : JSON.parse(req.query.filter);
    const reddits = await Reddit.find(filter).limit(limit).skip(offset).exec();

    if (reddits.length > 0) {
      res.status(200).json({ result: true, data: reddits });
    } else {
      res.status(400).json({ result: false, data: "not found reddits." });
    }
  },
};