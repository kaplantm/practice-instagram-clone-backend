const postsController = require("../controllers").posts;
const commentsController = require("../controllers").comments;

module.exports = app => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to the Todos API!"
    })
  );

  app.post("/api/posts", postsController.create);
  app.get("/api/posts", postsController.list);

  app.post("/api/posts/:todoId/comments", commentsController.create);
  // app.get("/api/posts/:todoId/comments", commentsController.list);
};
