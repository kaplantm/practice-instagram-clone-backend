const postsController = require("../controllers").posts;
const commentsController = require("../controllers").comments;
const usersController = require("../controllers").users;

module.exports = app => {
  app.post("/api/users", usersController.create);
  app.patch("/api/users/:userId", usersController.patch_update);
  app.delete("/api/users/:userId", usersController.delete);

  app.post("/api/posts", postsController.create);
  app.get("/api/posts", postsController.get_all);
  app.get("/api/posts/:postId/", postsController.get_one);
  app.patch("/api/posts/:postId/", postsController.patch_update);
  app.put("/api/posts/:postId/", postsController.put_update);
  app.delete("/api/posts/:postId/", postsController.delete);

  app.post("/api/posts/:postId/comments", commentsController.create);
  // app.patch(
  //   "/api/posts/:postId/comments/:commentId",
  //   commentsController.patch_update
  // );
  // app.delete(
  //   "/api/posts/:postId/comments/:commentId",
  //   commentsController.delete
  // );
};

//TODO
//Hook up to feed - make user page, and make page showing most recent posts from all users
//Pause, setup react native
//Make those pages in native
//then api testing
//then figure out authentication

//later: make separate table for public user data (for user profiles)
//TODOLATER (AUTHENTICATION)
//add route for sign in

//add route for logout
// TODOLATER: should add route for getting one comment e.g. :
// app.get("/api/posts/:postId/comments/2", commentsController.get_comment);
// app.get("/api/posts/:postId/comments", commentsController.list);

//TODOLATER
// make separate table to user public user data (e.g. for showing profile)
