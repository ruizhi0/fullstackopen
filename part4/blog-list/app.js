const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("express-async-errors");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const config = require("./utils/config");
const middleware = require("./utils/middleware");

const app = express();

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

app.use(middleware.errorHandler);

module.exports = app;
