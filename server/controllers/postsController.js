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
  list(req, res) {
    return Post.findAll({
      include: [
        {
          model: Comment,
          as: "comments"
        }
      ]
    })
      .then(post => res.status(200).send(post))
      .catch(error => res.status(400).send(error));
  }
};

// This create function is designed to be a route handler for whichever Express route we'll choose to attach
// it to. The req parameter is the incoming request from the client. The res parameter is the response we're
// preparing to eventually send back to the client in response to their request :). All Express route
// handlers follow this method signature. We can have a third parameter, conventionally named next,
// which is a function that passes the request on to the next route handler (meaning that a route can be
// handled by multiple route handlers, in which case it's piped or passed along all of those route handlers).
// We are, however, not going to see a use case for that in this application :(.
