const User = require("../models").User;
const BASE_URL = "http://0.0.0.0:4000/";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  login(req, res) {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        if (!user) {
          return res.status(401).json({
            message: "Unable to login"
          });
        } else {
          bcrypt.compare(req.body.password, user.password, function(
            err,
            result
          ) {
            if (err) {
              return res.status(401).json({
                message: "Unable to login"
              });
            } else if (result) {
              let user_data = {
                email: user.email,
                userId: user.id
              };

              const token = jwt.sign(user_data, process.env.JWT_KEY, {
                // expiresIn: "900s" //token is valid for 15 minutes
                // expiresIn: "40s"
              });

              const refresh_token = jwt.sign(
                user_data,
                process.env.JWT_REFRESH_KEY,
                { expiresIn: "7d" } //refresh is valid for seven days
                // { expiresIn: "120s" }
              );
              return res.status(200).json({
                message: "Login Successful",
                login: true,
                token: token,
                refresh_token: refresh_token,
                user: user_data
              });
            } else {
              return res.status(401).json({
                message: "Unable to login"
              });
            }
          });
        }
      })
      .catch(err => res.status(500).json({ error: err }));
  },
  create(req, res) {
    return User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        if (!user) {
          return bcrypt.hash(req.body.password, 10, function(err, hash) {
            // Store hash in your password DB.
            return User.create({
              username: req.body.username,
              email: req.body.email,
              password: hash,
              avatar: BASE_URL + req.file.path
            })
              .then(user => {
                let data = Object.assign(user, { password: "Encrypted" });
                res.status(201).send({ message: "User Created" });
              })
              .catch(error => res.status(500).send(error));
          });
        } else {
          return res.status(409).json({
            message: "Invalid Email"
          });
        }
      })
      .catch(err => res.status(500).send(error));
  },
  patch_update(req, res) {
    return User.findByPk(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: "User Not Found"
          });
        }
        let fields = Object.keys(req.body);
        let data = req.body;

        if (req.file) {
          fields.push("avatar");
          data["avatar"] = BASE_URL + req.file.path || user.avatar;
        }
        return user
          .update(data, { fields: fields })
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
