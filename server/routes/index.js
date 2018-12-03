const postsController = require("../controllers").posts;
const commentsController = require("../controllers").comments;

module.exports = app => {
  app.post("/api/posts", postsController.create);
  app.get("/api/posts", postsController.get_all);
  app.get("/api/posts/:postId/", postsController.get_one);
  app.patch("/api/posts/:postId/", postsController.patch_update);
  app.put("/api/posts/:postId/", postsController.put_update);
  app.delete("/api/posts/:postId/", postsController.delete);

  app.post("/api/posts/:postId/comments", commentsController.create);
  app.patch(
    "/api/posts/:postId/comments/:commentId",
    commentsController.patch_update
  );
  app.delete(
    "/api/posts/:postId/comments/:commentId",
    commentsController.delete
  );
  // TODO: should add route for getting one comment e.g. :
  // app.get("/api/posts/:postId/comments/2", commentsController.get_comment);
  // app.get("/api/posts/:postId/comments", commentsController.list);
};
