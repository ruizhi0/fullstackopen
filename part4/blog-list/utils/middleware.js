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

module.exports = {
  errorHandler,
  tokenExtractor,
};
