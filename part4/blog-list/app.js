const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("express-async-errors");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginsRouter = require("./controllers/logins");
const config = require("./utils/config");
const middleware = require("./utils/middleware");

const app = express();

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);

app.use("/api/blogs", middleware.userExtractor, blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/logins", loginsRouter);

app.use(middleware.errorHandler);

module.exports = app;
