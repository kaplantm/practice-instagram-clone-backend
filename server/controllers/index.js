// This is where we're going to be exporting our controllers from.
// I find this helpful since it helps me consolidate my imports (require statements) from once central place.

const comments = require("./commentsController");
const posts = require("./postsController");
const users = require("./usersController");
const tokens = require("./tokensController");

module.exports = {
  posts,
  comments,
  users,
  tokens
};
