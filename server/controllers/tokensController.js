const jwt = require("jsonwebtoken");

module.exports = {
  refresh(req, res) {
    console.log("refresh");
    console.log(req.body);
    try {
      const decoded = jwt.verify(
        req.body.refresh_token,
        process.env.JWT_REFRESH_KEY
      );
      req.userData = decoded;

      let user = {
        email: req.body.email,
        userId: req.body._id
      };
      console.log(req.body);
      console.log(req.userData);
      const token = jwt.sign(user, process.env.JWT_KEY, {
        // expiresIn: "900s"
        expiresIn: "40s"
      });
      //refresh is valid for seven days
      const refresh_token = jwt.sign(user, process.env.JWT_REFRESH_KEY, {
        // expiresIn: "7d"
        expiresIn: "120s"
      });

      res.status(200).json({ token: token, refresh_token: refresh_token });
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        message: "Authentication Required"
      });
    }
  }
};
