const Post = require("../models").Post;
const Comment = require("../models").Comment;

module.exports = {
  create(req, res) {
    return Post.create({
      title: req.body.title,
      userId: req.body.userId,
      image_url: req.body.image_url,
      caption: req.body.caption
    })
      .then(post => res.status(201).send(post))
      .catch(error => res.status(400).send(error));
  },
  get_all(req, res) {
    posts =
      req.query.include == "comments"
        ? Post.findAll({
            include: [
              {
                model: Comment,
                as: "comments"
              }
            ]
          })
        : Post.findAll();

    return posts
      .then(post => res.status(200).send(post))
      .catch(error => res.status(400).send(error));
  },

  get_one(req, res) {
    return Post.findById(req.params.postId, {
      include: [
        {
          model: Comment,
          as: "comments"
        }
      ]
    })
      .then(post => {
        console.log(post);
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
    return Post.findById(req.params.postId, {
      include: [
        {
          model: Comment,
          as: "comments"
        }
      ]
    })
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
            //below is a much more scalable version of the or statements above
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
      return Post.findById(req.params.postId, {
        include: [
          {
            model: Comment,
            as: "comments"
          }
        ]
      })
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
    return Post.findById(req.params.postId)
      .then(post => {
        if (!post) {
          return res.status(404).send({
            message: "Post Not Found"
          });
        }
        return post
          .destroy()
          .then(() => res.status(200).send("Post Deleted"))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
  // list_all_with_comments(req, res) {
  //   return Post.findAll({
  //     include: [
  //       {
  //         model: Comment,
  //         as: "comments"
  //       }
  //     ]
  //   })
  //     .then(post => res.status(200).send(post))
  //     .catch(error => res.status(400).send(error));
  // }
};

// This create function is designed to be a route handler for whichever Express route we'll choose to attach
// it to. The req parameter is the incoming request from the client. The res parameter is the response we're
// preparing to eventually send back to the client in response to their request :). All Express route
// handlers follow this method signature. We can have a third parameter, conventionally named next,
// which is a function that passes the request on to the next route handler (meaning that a route can be
// handled by multiple route handlers, in which case it's piped or passed along all of those route handlers).
// We are, however, not going to see a use case for that in this application :(.
