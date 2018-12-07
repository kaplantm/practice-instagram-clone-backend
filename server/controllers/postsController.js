const Post = require("../models").Post;
const Comment = require("../models").Comment;
const User = require("../models").User;
const helper = require("./helpers/helper");

//right now when "user" in included in posts all user data is sent back - including emails and passwords (encrypted)
//should create separate public facing user profile data table including username, userid, other public user info
module.exports = {
  create(req, res) {
    return User.findOne({
      where: {
        id: req.params.userId
      }
    })
      .then(user => {
        if (user) {
          return Post.create({
            title: req.body.title,
            userId: req.params.userId,
            image_url: req.body.image_url,
            caption: req.body.caption
          })
            .then(post => res.status(201).send(post))
            .catch(error => res.status(400).send(error));
        } else {
          res.status(404).send({
            message: "User Not Found"
          });
        }
      })
      .catch(error => res.status(500).send(error));
  },

  get_all_by_user(req, res) {
    let offset = req.query.offset || 0;
    let limit = req.query.limit || 20;
    return Post.findAll({
      include: helper.includes(req.query.include, User, Comment),
      order: [helper.sort(req.query.sort, Post)],
      where: { userId: req.params.userId },
      offset: offset,
      limit: limit
    })
      .then(posts => {
        if (posts.length > 0) {
          res.status(200).send(posts);
        } else {
          res.status(404).send({ message: "No posts found." });
        }
      })
      .catch(error => res.status(400).send(error));
  },

  get_all(req, res) {
    let offset = req.query.offset || 0;
    let limit = req.query.limit || 20;
    return Post.findAll({
      include: helper.includes(req.query.include, User, Comment),
      order: [helper.sort(req.query.sort, Post)],
      offset: offset,
      limit: limit
    })
      .then(posts => {
        if (posts.length > 0) {
          res.status(200).send(posts);
        } else {
          res.status(404).send({ message: "No posts found." });
        }
      })
      .catch(error => res.status(400).send(error));
  },

  get_one(req, res) {
    let offset = req.query.offset || 0;
    let limit = req.query.limit || 20;
    return Post.findOne({
      include: helper.includes(req.query.include, User, Comment),
      where: { id: req.params.postId, userId: req.params.userId },
      offset: offset,
      limit: limit
    })
      .then(post => {
        if (!post) {
          return res.status(404).send({
            message: "Post Not Found"
          });
        }
        return res.status(200).send(post);
      })
      .catch(error => res.status(400).send(error));
  },

  patch_update(req, res) {
    return Post.findByPk(req.params.postId)
      .then(post => {
        if (!post) {
          return res.status(404).send({
            message: "Post Not Found"
          });
        }
        return (
          post
            // .update({
            //   title: req.body.title || post.title,
            //   image_url: req.body.image_url || post.image_url,
            //   caption: req.body.caption || post.caption
            // })
            //below is a much more scalable version of the statements above
            .update(req.body, { fields: Object.keys(req.body) })

            .then(() => res.status(200).send(post)) // Send back the updated post.
            .catch(error => res.status(400).send(error))
        );
      })
      .catch(error => res.status(400).send(error));
  },

  put_update(req, res) {
    if (
      req.body.title &&
      req.body.image_url &&
      req.body.caption &&
      req.body.userId
    ) {
      return Post.findByPk(req.params.postId)
        .then(post => {
          if (!post) {
            return res.status(404).send({
              message: "Post Not Found"
            });
          }
          return post
            .update(req.body, { fields: Object.keys(req.body) })
            .then(() => res.status(200).send(post)) // Send back the updated post.
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    } else {
      res.status(400).send({
        message: "All fields are required.",
        postFormat: {
          title: "string",
          image_url: "string",
          caption: "string",
          userId: "string"
        }
      });
    }
  },

  delete(req, res) {
    return Post.findByPk(req.params.postId)
      .then(post => {
        if (!post) {
          return res.status(404).send({
            message: "Post Not Found"
          });
        }
        return post
          .destroy()
          .then(() => res.status(200).send({ message: "Post Deleted" }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};

//https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize
// This create function is designed to be a route handler for whichever Express route we'll choose to attach
// it to. The req parameter is the incoming request from the client. The res parameter is the response we're
// preparing to eventually send back to the client in response to their request :). All Express route
// handlers follow this method signature. We can have a third parameter, conventionally named next,
// which is a function that passes the request on to the next route handler (meaning that a route can be
// handled by multiple route handlers, in which case it's piped or passed along all of those route handlers).
// We are, however, not going to see a use case for that in this application :(.
