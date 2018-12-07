const postsController = require("../controllers").posts;
const commentsController = require("../controllers").comments;
const usersController = require("../controllers").users;
const tokenController = require("../controllers").tokens;
const checkAuth = require("../middleware/check-auth");
const multer = require("multer");

module.exports = app => {
  const storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, "./uploads");
    },
    filename: function(req, file, callback) {
      callback(
        null,
        new Date().toISOString() +
          Math.floor(Math.random() * Math.floor(100)) +
          "." +
          file.mimetype.split("/")[1]
      );
    }
  });
  const fileFilter = (req, file, callback) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
      callback(null, true);
    } else {
      callback(new Error("Invalid File Type"), false);
    }
  };
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
  });

  //adds header to prevent cors errors
  //asterisks could be replaces to url to limit usage to known sites
  //but tools like postman would still be able to query api
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    //browser does an options requestion prior to a post to
    //determine which types of requests are allowed
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }
    next();
  });
  // Users
  app.post("/api/users/login", usersController.login);
  app.post("/api/users", upload.single("avatar"), usersController.create);
  app.patch(
    "/api/users/:userId",
    upload.single("avatar"),
    usersController.patch_update
  );
  app.delete("/api/users/:userId", usersController.delete);

  // Posts by user
  app.post("/api/users/:userId/posts", postsController.create);
  app.get("/api/users/:userId/posts", postsController.get_all_by_user);
  app.get(
    "/api/users/:userId/posts/:postId/",
    checkAuth,
    postsController.get_one
  );
  app.patch("/api/users/:userId/posts/:postId/", postsController.patch_update);
  app.put("/api/users/:userId/posts/:postId/", postsController.put_update);
  app.delete("/api/users/:userId/posts/:postId/", postsController.delete);

  // Comments by user's post
  app.post(
    "/api/users/:userId/posts/:postId/comments",
    commentsController.create
  );

  //General posts (used for getting recent posts)
  app.get("/api/posts", postsController.get_all);

  //refresh token
  app.post("/api/tokens", tokenController.refresh);

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
// JWT refresh
// change scrollview to flat list and implement load more on hit bottom
// login on ios
// save token on ios
//test refresh (set time lower than 1hr)
//TODO password length restrictions (back and front end)
//valid email restrictions (back and front end)
//TODO
//Pagination? (in react native) - how to trigger and get more, append to curernt lists of posts?
//then api testing (switch to dev)
//ADJUST BACKEND TO ONLY SAVE RELATIVE PATH OF UPLOADS - important for moving api to new server later
//then figure out authentication
//make login screens

//make return empty list if no posts found
//add way to add comments in app
//add way to add posts in app

//later: make separate table for public user data (for user profiles)
//TODOLATER (AUTHENTICATION)
//add route for sign in

//add route for logout
// TODOLATER: should add route for getting one comment e.g. :
// app.get("/api/posts/:postId/comments/2", commentsController.get_comment);
// app.get("/api/posts/:postId/comments", commentsController.list);

//TODOLATER
//image upload w/ directories
// make separate table to user public user data (e.g. for showing profile)

//Pages to do
//login
//signup
//add comment
//add post
//settings?
