const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    console.log(req.body);
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded; //now will be able to access decoded user data on req
    console.log(req.userData);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Authentication Required"
    });
  }
};
