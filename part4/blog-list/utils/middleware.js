const errorHandler = (error, req, res, next) => {
  switch (error.name) {
    case "CastError":
      res.status(400).json({ error: "malformed id" });
      break;
    case "ValidationError":
      res.status(400).json({ error: error.message });
      break;
  }

  next(error);
};

module.exports = {
  errorHandler,
};
