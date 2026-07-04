const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {

  try {

    const token = req.header("Authorization");

    if (!token) {

      return res.status(401).json({
        message: "Access denied"
      });
    }

    const verified = jwt.verify(
      token.replace("Bearer ", ""),
      SECRET
    );

    req.user = verified;

    next();

  } catch (err) {

    res.status(401).json({
      message: "Invalid token"
    });
  }
};

module.exports = authMiddleware;