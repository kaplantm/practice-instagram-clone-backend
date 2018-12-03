// This is where we're going to be exporting our controllers from.
// I find this helpful since it helps me consolidate my imports (require statements) from once central place.

const comments = require("./commentsController");
const posts = require("./postsController");

module.exports = {
  posts,
  comments
};
