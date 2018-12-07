const jwt = require("jsonwebtoken");

//based on:
//https://www.youtube.com/watch?v=8Ip0pcwbWYM&list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q&index=13
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded; //now will be able to access decoded user data on req
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Authentication Required"
    });
  }
};
