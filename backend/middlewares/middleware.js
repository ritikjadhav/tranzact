const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader.startsWith("Bearer ")) {
    res.status(403).json({});
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    res.status(403).json({
      message: "Authentication failed",
    });
  }
};

module.exports = authMiddleware;
