const Comment = require("../models").Comment;

//need to update this so comments only added if have existing post
module.exports = {
  create(req, res) {
    return Comment.create({
      userId: req.body.userId,
      content: req.body.content,
      postId: req.body.postId
    })
      .then(comment => res.status(201).send(comment))
      .catch(error => res.status(400).send(error));
  }
  // list(req, res) {
  //   return Comment.all()
  //     .then(comments => res.status(200).send(comments))
  //     .catch(error => res.status(400).send(error));
  // }
};
