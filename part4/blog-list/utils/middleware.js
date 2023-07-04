const jwt = require("jsonwebtoken");
const User = require("../models/user");

const errorHandler = (error, req, res, next) => {
  switch (error.name) {
    case "CastError":
      return res.status(400).json({ error: "malformed id" });
    case "ValidationError":
      return res.status(400).json({ error: error.message });
    case "JsonWebTokenError":
      return res.status(400).json({ error: error.message });
  }

  next(error);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("Authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    req.token = authorization.replace("Bearer ", "");
  }

  next();
};

const userExtractor = async (req, res, next) => {
  if (req.token) {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!decodedToken) {
      return res.status(401).json({
        error: "invalid token",
      });
    }

    const user = await User.findById(decodedToken.id);
    req.user = user;
  }

  next();
};

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor,
};
