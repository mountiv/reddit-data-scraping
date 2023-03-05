const { Post, Reddit } = require("../models");

module.exports = {
  savePosts: async function (req, res) {
    const reddits = await Reddit.find({})
      .select("data.display_name")
      .limit(500);
    const currtime = Date.now();
    var ii = 0;
    reddits.map(async (e, i) => {
      const reddit = e.data.display_name;

      require("request-promise")(
        `https://www.reddit.com/r/${reddit}.json?limit=50`
      )
        .then(async function (resData) {
          const result = JSON.parse(resData);
          result.data.children.map(async (e, i) => {
            if (
              Number(currtime) / 1000 - Number(e.data.created) <=
              1 * 60 * 60
            ) {
              ii++;
              const post = new Post({
                kind: e.kind,
                data: e.data,
              });
              console.log(ii);
              await post.save();
            }
          });
        })
        .catch(function (err) {
          // failed ...
        });
    });

    res.send("recent posts saving triggered.");
  },
};
