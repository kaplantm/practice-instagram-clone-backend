const Comment = require("../models").Comment;
const Post = require("../models").Post;

module.exports = {
  create(req, res) {
    return Post.findOne({
      where: {
        id: req.params.postId
      }
    })
      .then(post => {
        if (post) {
          return Comment.create({
            userId: req.body.userId,
            content: req.body.content,
            postId: req.params.postId
          })
            .then(comment => res.status(201).send(comment))
            .catch(error => res.status(400).send(error));
        } else {
          res.status(404).send({
            message: "Post Not Found"
          });
        }
      })
      .catch(error => res.status(500).send(error));
  },

  patch_update(req, res) {
    return Comment.findOne({
      where: {
        id: req.params.commentId,
        postId: req.params.postId
      }
    })
      .then(Comment => {
        if (!Comment) {
          return res.status(404).send({
            message: "Comment Not Found"
          });
        }

        return Comment.update(req.body, { fields: Object.keys(req.body) })
          .then(updatedComment => res.status(200).send(updatedComment))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  delete(req, res) {
    return Comment.findOne({
      where: {
        id: req.params.commentId,
        postId: req.params.postId
      }
    })
      .then(Comment => {
        if (!Comment) {
          return res.status(404).send({
            message: "Comment Not Found"
          });
        }
        return Comment.destroy()
          .then(() => res.status(200).send({ message: "Comment Deleted" }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
