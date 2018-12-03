const User = require("../models").User;

module.exports = {
  create(req, res) {
    return User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },
  patch_update(req, res) {
    return User.findByPk(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: "User Not Found"
          });
        }
        return user
          .update(req.body, { fields: Object.keys(req.body) })
          .then(() => res.status(200).send(user)) // Send back the updated post.
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  delete(req, res) {
    return User.findByPk(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: "User Not Found"
          });
        }
        return user
          .destroy()
          .then(() => res.status(200).send({ message: "User Deleted" }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
