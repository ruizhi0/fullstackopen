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

module.exports = {
  errorHandler,
};
